const AppError = require('./AppError');

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

const validateLogin = ({ email, password }) => {
  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return { valid: false, message: 'Email and password required.' };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: 'Please provide a valid email' };
  }
  return { valid: true };
};

const validateRegistration = ({ fullName, email, password }) => {
  if (!isNonEmptyString(fullName) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
    return { valid: false, message: 'All fields are required' };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: 'Please provide a valid email' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

const validateNotifyPayload = ({ email, message }) => {
  if (!isNonEmptyString(email) || !isNonEmptyString(message)) {
    return { valid: false, message: 'Email and message are required' };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: 'Please provide a valid email' };
  }
  return { valid: true };
};

const validateAttendanceAlert = ({ studentEmail, subject, percentage }) => {
  if (!isNonEmptyString(studentEmail) || !isNonEmptyString(subject)) {
    return { valid: false, message: 'Student email and subject are required' };
  }
  if (!isValidEmail(studentEmail)) {
    return { valid: false, message: 'Please provide a valid student email' };
  }
  return { valid: true };
};

const assertObjectId = (id, label = 'ID') => {
  if (!id || !isValidObjectId(id)) {
    throw new AppError(`Invalid ${label}`, 400);
  }
};

const validateStudentBody = (body, isUpdate = false) => {
  const errors = [];
  if (!isUpdate || body.user !== undefined) {
    if (!body.user || !isValidObjectId(body.user)) errors.push('Valid user ID is required');
  }
  if (!isUpdate || body.studentId !== undefined) {
    if (!isNonEmptyString(body.studentId)) errors.push('Student ID is required');
  }
  if (body.semester !== undefined && (body.semester < 1 || body.semester > 12)) {
    errors.push('Semester must be between 1 and 12');
  }
  return errors;
};

const validateTeacherBody = (body, isUpdate = false) => {
  const errors = [];
  if (!isUpdate || body.user !== undefined) {
    if (!body.user || !isValidObjectId(body.user)) errors.push('Valid user ID is required');
  }
  if (!isUpdate || body.employeeId !== undefined) {
    if (!isNonEmptyString(body.employeeId)) errors.push('Employee ID is required');
  }
  return errors;
};

const validateAttendanceBody = (body, isUpdate = false) => {
  const errors = [];
  if (!isUpdate || body.student !== undefined) {
    if (!body.student || !isValidObjectId(body.student)) errors.push('Valid student ID is required');
  }
  if (!isUpdate || body.subject !== undefined) {
    if (!isNonEmptyString(body.subject)) errors.push('Subject is required');
  }
  if (body.status && !['present', 'absent', 'late'].includes(body.status)) {
    errors.push('Status must be present, absent, or late');
  }
  return errors;
};

const validateExpenseBody = (body, isUpdate = false) => {
  const errors = [];
  if (!isUpdate || body.user !== undefined) {
    if (!body.user || !isValidObjectId(body.user)) errors.push('Valid user ID is required');
  }
  if (!isUpdate || body.description !== undefined) {
    if (!isNonEmptyString(body.description)) errors.push('Description is required');
  }
  if (!isUpdate || body.amount !== undefined) {
    if (body.amount === undefined || body.amount < 0) errors.push('Valid amount is required');
  }
  if (body.type && !['expense', 'income'].includes(body.type)) {
    errors.push('Type must be expense or income');
  }
  return errors;
};

module.exports = {
  isNonEmptyString,
  isValidEmail,
  isValidObjectId,
  validateLogin,
  validateRegistration,
  validateNotifyPayload,
  validateAttendanceAlert,
  assertObjectId,
  validateStudentBody,
  validateTeacherBody,
  validateAttendanceBody,
  validateExpenseBody
};
