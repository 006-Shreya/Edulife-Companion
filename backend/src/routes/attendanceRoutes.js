const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'teacher', 'student'), asyncHandler(attendanceController.getAttendanceRecords));
router.get('/:id', authorize('admin', 'teacher', 'student'), asyncHandler(attendanceController.getAttendanceById));
router.post('/', authorize('admin', 'teacher'), asyncHandler(attendanceController.createAttendance));
router.put('/:id', authorize('admin', 'teacher'), asyncHandler(attendanceController.updateAttendance));
router.delete('/:id', authorize('admin', 'teacher'), asyncHandler(attendanceController.deleteAttendance));

module.exports = router;
