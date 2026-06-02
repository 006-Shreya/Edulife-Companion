# EduLife Companion

Student life management platform with expense tracking, attendance, AI chat, and study tools.

## Project Structure

```
EduLifeCompanion/
├── backend/                 # Express API server
│   ├── server.js            # Entry point
│   ├── data/users.json      # User persistence (JSON, pre-MongoDB)
│   └── src/
│       ├── config/          # Environment config
│       ├── controllers/     # Request handlers
│       ├── middleware/      # Error handling, etc.
│       ├── models/          # Data access layer
│       ├── routes/          # API route definitions
│       ├── services/        # Email, external APIs
│       └── utils/           # Validators, helpers
├── frontend/
│   ├── pages/               # HTML pages
│   ├── assets/              # Images, static media
│   ├── styles/              # CSS modules
│   └── scripts/
│       ├── config/          # API configuration
│       ├── utils/           # Shared utilities
│       ├── components/      # Reusable UI logic
│       └── pages/           # Page-specific scripts
├── ai-service/              # Python face recognition microservice
│   └── face_service/
└── package.json             # Root scripts
```

## Quick Start

1. Install backend dependencies:
   ```bash
   cd backend && npm install
   ```

2. Start MongoDB locally (or use MongoDB Atlas) and configure `backend/.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/edulife
   EMAIL_USER=your@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register user (returns JWT) |
| POST | `/api/signup` | Signup alias (returns JWT) |
| POST | `/api/login` | Login (returns JWT) |
| GET | `/api/me` | Current user (requires JWT) |
| POST | `/api/notify-exceed-limit` | Expense limit email alert |
| POST | `/api/attendance-alert` | Low attendance email alert |
| CRUD | `/api/users` | User management |
| CRUD | `/api/students` | Student profiles |
| CRUD | `/api/teachers` | Teacher profiles |
| CRUD | `/api/attendance` | Attendance records |
| CRUD | `/api/expenses` | Expense/income records |

Legacy `users.json` is auto-migrated to MongoDB on first startup when the User collection is empty.

### Authentication

- JWT in `Authorization: Bearer <token>` header
- Roles: `student`, `teacher`, `admin`
- Public signup always creates `student` role; admins create other roles via `POST /api/users`
- Protected CRUD routes require valid JWT + role

Add to `backend/.env`:
```
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
```

## AI Face Service (optional)

```bash
cd ai-service/face_service
pip install flask flask-cors face_recognition opencv-python numpy
python server.py
```

Runs on port 5001.
