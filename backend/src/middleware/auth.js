const User = require('../models/User');
const AppError = require('../utils/AppError');
const { verifyToken } = require('../services/tokenService');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized. Please log in.', 401));
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError('User no longer exists.', 401));
    }

    if (user.role !== decoded.role) {
      return next(new AppError('Session invalid. Please log in again.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('You do not have permission to perform this action.', 403));
  }
  next();
};

module.exports = { protect, authorize };
