const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true
    },
    department: {
      type: String,
      trim: true,
      default: ''
    },
    subjects: [{
      type: String,
      trim: true
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
