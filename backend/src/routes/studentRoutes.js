const express = require('express');
const studentController = require('../controllers/studentController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'teacher', 'student'), asyncHandler(studentController.getStudents));
router.get('/:id', authorize('admin', 'teacher', 'student'), asyncHandler(studentController.getStudentById));
router.post('/', authorize('admin'), asyncHandler(studentController.createStudent));
router.put('/:id', authorize('admin', 'teacher'), asyncHandler(studentController.updateStudent));
router.delete('/:id', authorize('admin'), asyncHandler(studentController.deleteStudent));

module.exports = router;
