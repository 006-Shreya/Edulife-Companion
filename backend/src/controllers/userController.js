const User = require('../models/User');
const AppError = require('../utils/AppError');
const { assertObjectId } = require('../utils/validators');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ success: true, count: users.length, data: users });
};

const getUserById = async (req, res) => {
  assertObjectId(req.params.id, 'user ID');
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, data: user });
};

const createUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const user = await User.create({ fullName, email, password, role });
  const userObj = user.toObject();
  delete userObj.password;
  res.status(201).json({ success: true, data: userObj });
};

const updateUser = async (req, res) => {
  assertObjectId(req.params.id, 'user ID');
  const { fullName, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { fullName, email, role },
    { new: true, runValidators: true }
  ).select('-password');
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, data: user });
};

const deleteUser = async (req, res) => {
  assertObjectId(req.params.id, 'user ID');
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, message: 'User deleted successfully' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
