const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student reference is required']
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'present'
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    }
  },
  { timestamps: true }
);

attendanceSchema.index({ student: 1, subject: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
