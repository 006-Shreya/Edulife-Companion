const Student = require('../models/Student');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { assertObjectId, validateStudentBody } = require('../utils/validators');

const getStudents = async (req, res) => {
  const students = await Student.find().populate('user', 'fullName email role');
  res.json({ success: true, count: students.length, data: students });
};

const getStudentById = async (req, res) => {
  assertObjectId(req.params.id, 'student ID');
  const student = await Student.findById(req.params.id).populate('user', 'fullName email role');
  if (!student) throw new AppError('Student not found', 404);
  res.json({ success: true, data: student });
};

const createStudent = async (req, res) => {
  const errors = validateStudentBody(req.body);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const user = await User.findById(req.body.user);
  if (!user) throw new AppError('User not found', 404);

  const student = await Student.create(req.body);
  await student.populate('user', 'fullName email role');
  res.status(201).json({ success: true, data: student });
};

const updateStudent = async (req, res) => {
  assertObjectId(req.params.id, 'student ID');
  const errors = validateStudentBody(req.body, true);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('user', 'fullName email role');
  if (!student) throw new AppError('Student not found', 404);
  res.json({ success: true, data: student });
};

const deleteStudent = async (req, res) => {
  assertObjectId(req.params.id, 'student ID');
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) throw new AppError('Student not found', 404);
  res.json({ success: true, message: 'Student deleted successfully' });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
