const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true
    },
    department: {
      type: String,
      trim: true,
      default: ''
    },
    semester: {
      type: Number,
      min: [1, 'Semester must be at least 1'],
      max: [12, 'Semester cannot exceed 12']
    },
    enrollmentYear: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
