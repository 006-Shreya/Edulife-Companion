const emailService = require('../services/emailService');
const { validateNotifyPayload, validateAttendanceAlert } = require('../utils/validators');

const notifyExceedLimit = async (req, res, next) => {
  try {
    const { email, message } = req.body;

    const validation = validateNotifyPayload({ email, message });
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const info = await emailService.sendLimitExceededEmail(email, message);
    console.log('Email sent successfully:', info.response);

    return res.json({ success: true, message: 'Notification email sent successfully' });
  } catch (error) {
    console.error('Detailed error sending notification email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send notification email',
      error: error.message
    });
  }
};

const attendanceAlert = async (req, res, next) => {
  try {
    const { studentEmail, subject, percentage } = req.body;

    const validation = validateAttendanceAlert({ studentEmail, subject, percentage });
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const info = await emailService.sendAttendanceAlertEmail(
      studentEmail,
      subject,
      percentage ?? 0
    );
    console.log('Attendance alert sent:', info.response);

    return res.json({ success: true, message: 'Attendance alert sent successfully' });
  } catch (error) {
    console.error('Error sending attendance alert:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send attendance alert',
      error: error.message
    });
  }
};

module.exports = {
  notifyExceedLimit,
  attendanceAlert
};
