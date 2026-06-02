const jwt = require('jsonwebtoken');
const config = require('../config/env');

const signToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN
  });
};

const verifyToken = (token) => jwt.verify(token, config.JWT_SECRET);

module.exports = { signToken, verifyToken };
