const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

transporter.verify((error) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendWelcomeEmail = (email, fullName) => {
  const mailOptions = {
    from: `"EduLife Team" <${config.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to EduLife Companion!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #1E3C72; text-align: center;">Welcome to EduLife Companion!</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for signing up with EduLife Companion. We're excited to have you join our community!</p>
        <p>With your new account, you can access all of our learning resources, track your progress, and connect with other learners.</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:5000/pages/login.html" style="background-color: #FFD700; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Your Account</a>
        </div>
        <p style="margin-top: 30px;">Best regards,<br>The EduLife Team</p>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
};

const sendLimitExceededEmail = (email, message) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: 'Monthly Expense Limit Exceeded',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #d63031; text-align: center;">Expense Limit Alert</h2>
        <p>Dear User,</p>
        <p>${message}</p>
        <p>Please review your expenses and adjust your spending accordingly.</p>
        <p style="margin-top: 30px;">Best regards,<br>EduLife Companion Team</p>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
};

const sendAttendanceAlertEmail = (email, subject, percentage) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: 'Attendance Alert - EduLife Companion',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #d63031; text-align: center;">Low Attendance Alert</h2>
        <p>Dear Student,</p>
        <p>Your attendance in <strong>${subject}</strong> has dropped to <strong>${percentage}%</strong>, which is below the required 75% threshold.</p>
        <p>Please take necessary action to improve your attendance.</p>
        <p style="margin-top: 30px;">Best regards,<br>EduLife Companion Team</p>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendLimitExceededEmail,
  sendAttendanceAlertEmail
};
