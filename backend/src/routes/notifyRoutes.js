const express = require('express');
const notifyController = require('../controllers/notifyController');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/notify-exceed-limit', asyncHandler(notifyController.notifyExceedLimit));
router.post('/attendance-alert', asyncHandler(notifyController.attendanceAlert));

module.exports = router;
