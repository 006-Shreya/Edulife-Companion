const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative']
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      default: 'expense'
    },
    category: {
      type: String,
      trim: true,
      default: 'general'
    },
    month: {
      type: String,
      trim: true
    },
    monthlyLimit: {
      type: Number,
      min: [0, 'Monthly limit cannot be negative']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
