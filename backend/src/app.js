const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const notifyRoutes = require('./routes/notifyRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
  res.redirect('/pages/landingPage.html');
});

// Legacy + new API routes (frontend-compatible paths preserved)
app.use('/api', authRoutes);
app.use('/api', notifyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/backend-status', (req, res) => {
  res.send('EduLife Companion Core Express Backend Running');
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
