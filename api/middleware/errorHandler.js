/**
 * Custom Error Class untuk API errors
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Error Handler Middleware
 * Menangani semua error yang terjadi di aplikasi
 */
const errorHandler = (err, req, res, next) => {
  // Log error untuk debugging
  console.error('='.repeat(50));
  console.error(`[ERROR] ${new Date().toISOString()}`);
  console.error(`[PATH] ${req.method} ${req.originalUrl}`);
  console.error(`[MESSAGE] ${err.message}`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[STACK] ${err.stack}`);
  }
  console.error('='.repeat(50));

  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  
  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const messages = Object.values(err.errors).map(val => val.message);
    message = `Validasi gagal: ${messages.join(', ')}`;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} sudah terdaftar`;
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Format ${err.path} tidak valid`;
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token tidak valid';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token sudah expired';
  }

  // Axios/External API Errors
  if (err.isAxiosError) {
    statusCode = err.response?.status || 502;
    message = err.response?.data?.message || 'External API error';
  }

  // Syntax Error (Invalid JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Format JSON tidak valid';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && {
      error: err.name,
      stack: err.stack
    }),
    timestamp: new Date().toISOString()
  });
};

/**
 * Async Handler Wrapper
 * Menghindari try-catch berulang di setiap controller
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Not Found Handler
 * Untuk route yang tidak ditemukan
 */
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} tidak ditemukan`);
  next(error);
};

module.exports = errorHandler;
module.exports.ApiError = ApiError;
module.exports.asyncHandler = asyncHandler;
module.exports.notFoundHandler = notFoundHandler;
