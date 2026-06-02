const Expense = require('../models/Expense');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { assertObjectId, validateExpenseBody } = require('../utils/validators');

const getExpenses = async (req, res) => {
  const filter = {};
  if (req.query.user) {
    assertObjectId(req.query.user, 'user ID');
    filter.user = req.query.user;
  }
  if (req.query.type) filter.type = req.query.type;
  if (req.query.month) filter.month = req.query.month;

  const expenses = await Expense.find(filter)
    .populate('user', 'fullName email')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: expenses.length, data: expenses });
};

const getExpenseById = async (req, res) => {
  assertObjectId(req.params.id, 'expense ID');
  const expense = await Expense.findById(req.params.id).populate('user', 'fullName email');
  if (!expense) throw new AppError('Expense not found', 404);
  res.json({ success: true, data: expense });
};

const createExpense = async (req, res) => {
  const errors = validateExpenseBody(req.body);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const user = await User.findById(req.body.user);
  if (!user) throw new AppError('User not found', 404);

  const expense = await Expense.create(req.body);
  await expense.populate('user', 'fullName email');
  res.status(201).json({ success: true, data: expense });
};

const updateExpense = async (req, res) => {
  assertObjectId(req.params.id, 'expense ID');
  const errors = validateExpenseBody(req.body, true);
  if (errors.length) throw new AppError(errors.join('. '), 400);

  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('user', 'fullName email');
  if (!expense) throw new AppError('Expense not found', 404);
  res.json({ success: true, data: expense });
};

const deleteExpense = async (req, res) => {
  assertObjectId(req.params.id, 'expense ID');
  const expense = await Expense.findByIdAndDelete(req.params.id);
  if (!expense) throw new AppError('Expense not found', 404);
  res.json({ success: true, message: 'Expense deleted successfully' });
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};
