const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const AppError = require('../utils/AppError');
const { assertObjectId, validateAttendanceBody } = require('../utils/validators');

const getAttendanceRecords = async (req, res) => {
  const filter = {};
  if (req.query.student) {
    assertObjectId(req.query.student, 'student ID');
    filter.student = req.query.student;
  }
  if (req.query.subject) filter.subject = req.query.subject;

  const records = await Attendance.find(filter)
    .populate('student')
    .populate('markedBy')
    .sort({ date: -1 });

  res.json({ success: true, count: records.length, data: records });
};

const getAttendanceById = async (req, res) => {
  assertObjectId(req.params.id, 'attendance ID');
  const record = await Attendance.findById(req.params.id)
    .populate('student')
    .populate('markedBy');
  if (!record) throw new AppError('Attendance record not found', 404);
  res.json({ success: true, data: record });
};

const createAttendance = async (req, res) => {
  const errors = validateAttendanceBody(req.body);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const student = await Student.findById(req.body.student);
  if (!student) throw new AppError('Student not found', 404);

  const record = await Attendance.create(req.body);
  await record.populate(['student', 'markedBy']);
  res.status(201).json({ success: true, data: record });
};

const updateAttendance = async (req, res) => {
  assertObjectId(req.params.id, 'attendance ID');
  const errors = validateAttendanceBody(req.body, true);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate(['student', 'markedBy']);
  if (!record) throw new AppError('Attendance record not found', 404);
  res.json({ success: true, data: record });
};

const deleteAttendance = async (req, res) => {
  assertObjectId(req.params.id, 'attendance ID');
  const record = await Attendance.findByIdAndDelete(req.params.id);
  if (!record) throw new AppError('Attendance record not found', 404);
  res.json({ success: true, message: 'Attendance record deleted successfully' });
};

module.exports = {
  getAttendanceRecords,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance
};
