const AppError = require('../utils/AppError');

const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateKey = (err) => {
  const field = Object.keys(err.keyValue || {})[0] || 'field';
  const value = err.keyValue ? err.keyValue[field] : '';
  if (field === 'email') {
    return new AppError('Email already registered', 400);
  }
  return new AppError(`Duplicate value for ${field}: ${value}`, 400);
};

const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(messages.join('. '), 400);
};

const sendErrorResponse = (err, res) => {
  const statusCode = err.statusCode || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal server error'
  };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    payload.error = err.stack;
  }

  return res.status(statusCode).json(payload);
};

const errorHandler = (err, req, res, next) => {
  console.error('Server Error Intercepted:', err.message);

  let error = err;

  if (err.name === 'CastError') error = handleCastError(err);
  if (err.code === 11000) error = handleDuplicateKey(err);
  if (err.name === 'ValidationError') error = handleValidationError(err);
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    error = new AppError('Invalid or expired token. Please log in again.', 401);
  }

  sendErrorResponse(error, res);
};

module.exports = errorHandler;
