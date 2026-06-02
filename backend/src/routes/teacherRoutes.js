const express = require('express');
const teacherController = require('../controllers/teacherController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'teacher'), asyncHandler(teacherController.getTeachers));
router.get('/:id', authorize('admin', 'teacher'), asyncHandler(teacherController.getTeacherById));
router.post('/', authorize('admin'), asyncHandler(teacherController.createTeacher));
router.put('/:id', authorize('admin'), asyncHandler(teacherController.updateTeacher));
router.delete('/:id', authorize('admin'), asyncHandler(teacherController.deleteTeacher));

module.exports = router;
