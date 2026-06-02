const User = require('../models/User');
const emailService = require('../services/emailService');
const { signToken } = require('../services/tokenService');
const { validateRegistration, validateLogin } = require('../utils/validators');

const sendAuthResponse = (user, res, statusCode, message) => {
  const token = signToken(user._id, user.role);

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    const validation = validateRegistration({ fullName, email, password });
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const allowedRoles = ['student', 'teacher', 'admin'];
    const assignedRole = req.user?.role === 'admin' && allowedRoles.includes(role)
      ? role
      : 'student';

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole
    });

    emailService.sendWelcomeEmail(user.email, user.fullName)
      .then((info) => console.log('Welcome email sent:', info.response))
      .catch((err) => console.error('Error sending welcome email:', err));

    return sendAuthResponse(
      user,
      res,
      201,
      'Registration successful! A welcome email has been sent to your address.'
    );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    return next(error);
  }
};

const signup = register;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    return sendAuthResponse(user, res, 200, 'Login successful!');
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role
    }
  });
};

module.exports = {
  register,
  signup,
  login,
  getMe
};
