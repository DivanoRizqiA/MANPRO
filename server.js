const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Import routes
const authRoutes = require('./api/routes/auth');
const checkRoutes = require('./api/routes/checks');
const analysisRoutes = require('./api/routes/analysis');

// Import custom middleware
const errorHandler = require('./api/middleware/errorHandler');

// ===================
// Security Middleware
// ===================

// Helmet - Security headers (allow swagger UI)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate Limiting - Prevent brute force & DDoS
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP per 15 minutes
  message: {
    success: false,
    message: 'Terlalu banyak request dari IP ini, coba lagi dalam 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for login/register (prevent brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 auth attempts per IP per 15 minutes
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login, coba lagi dalam 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Separate rate limit for password reset (more lenient)
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 password reset requests per IP per hour
  message: {
    success: false,
    message: 'Terlalu banyak permintaan reset password, coba lagi dalam 1 jam'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration - allow frontend access
app.use(cors({
  origin: ['http://localhost:9000', 'https://localhost:9000', 'http://localhost:7000', 'http://127.0.0.1:9000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ===================
// Body Parser & Logging
// ===================

app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Morgan - HTTP request logging
app.use(morgan('dev'));

// ===================
// Swagger API Documentation
// ===================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'DiaTeksi API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
  }
}));

// Serve swagger spec as JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ===================
// Apply Rate Limiting
// ===================

app.use('/api/', generalLimiter);
// Apply specific rate limiters BEFORE general auth limiter
app.use('/api/auth/forgot-password', passwordResetLimiter);
app.use('/api/auth/reset-password', passwordResetLimiter);
app.use('/api/auth/signin', authLimiter);
app.use('/api/auth/signup', authLimiter);

// ===================
// Routes
// ===================

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);
app.use('/api/analysis', analysisRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`
  });
});

// Global Error Handler (must be last middleware)
app.use(errorHandler);

// Connect to MongoDB first, then start server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  const PORT = process.env.PORT || 7000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local: http://127.0.0.1:${PORT}`);
    console.log(`Network: http://10.110.143.145:${PORT}`);
  });
});

// Handle connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});