const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./api/routes/auth');
const checkRoutes = require('./api/routes/checks');
const analysisRoutes = require('./api/routes/analysis');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);
app.use('/api/analysis', analysisRoutes);

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
    console.log(`Network: http://192.168.1.21:${PORT}`);
  });
});

// Handle connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});