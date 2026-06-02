/**
 * API configuration — uses same origin when served by Express backend.
 */
const API_CONFIG = {
  BASE_URL: window.location.origin,
  endpoints: {
    register: '/api/register',
    signup: '/api/signup',
    login: '/api/login',
    me: '/api/me',
    notifyExceedLimit: '/api/notify-exceed-limit',
    attendanceAlert: '/api/attendance-alert',
    chat: '/chat',
    users: '/api/users',
    students: '/api/students',
    teachers: '/api/teachers',
    attendance: '/api/attendance',
    expenses: '/api/expenses'
  }
};

function apiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
