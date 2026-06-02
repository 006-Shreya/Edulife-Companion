const express = require('express');
const expenseController = require('../controllers/expenseController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'teacher', 'student'), asyncHandler(expenseController.getExpenses));
router.get('/:id', authorize('admin', 'teacher', 'student'), asyncHandler(expenseController.getExpenseById));
router.post('/', authorize('admin', 'student'), asyncHandler(expenseController.createExpense));
router.put('/:id', authorize('admin', 'student'), asyncHandler(expenseController.updateExpense));
router.delete('/:id', authorize('admin', 'student'), asyncHandler(expenseController.deleteExpense));

module.exports = router;
