const express = require('express');
const authController = require('../controllers/authController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', asyncHandler(authController.register));
router.post('/signup', asyncHandler(authController.signup));
router.post('/login', asyncHandler(authController.login));
router.get('/me', protect, asyncHandler(authController.getMe));

module.exports = router;
