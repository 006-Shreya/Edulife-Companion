const Teacher = require('../models/Teacher');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { assertObjectId, validateTeacherBody } = require('../utils/validators');

const getTeachers = async (req, res) => {
  const teachers = await Teacher.find().populate('user', 'fullName email role');
  res.json({ success: true, count: teachers.length, data: teachers });
};

const getTeacherById = async (req, res) => {
  assertObjectId(req.params.id, 'teacher ID');
  const teacher = await Teacher.findById(req.params.id).populate('user', 'fullName email role');
  if (!teacher) throw new AppError('Teacher not found', 404);
  res.json({ success: true, data: teacher });
};

const createTeacher = async (req, res) => {
  const errors = validateTeacherBody(req.body);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const user = await User.findById(req.body.user);
  if (!user) throw new AppError('User not found', 404);

  const teacher = await Teacher.create(req.body);
  await teacher.populate('user', 'fullName email role');
  res.status(201).json({ success: true, data: teacher });
};

const updateTeacher = async (req, res) => {
  assertObjectId(req.params.id, 'teacher ID');
  const errors = validateTeacherBody(req.body, true);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('user', 'fullName email role');
  if (!teacher) throw new AppError('Teacher not found', 404);
  res.json({ success: true, data: teacher });
};

const deleteTeacher = async (req, res) => {
  assertObjectId(req.params.id, 'teacher ID');
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!teacher) throw new AppError('Teacher not found', 404);
  res.json({ success: true, message: 'Teacher deleted successfully' });
};

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};
