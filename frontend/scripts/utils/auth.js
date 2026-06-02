const AUTH_TOKEN_KEY = 'edulifeToken';
const AUTH_USER_KEY = 'edulifeUser';

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function getUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setAuth(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

function isLoggedIn() {
  return Boolean(getToken());
}

function hasRole(...roles) {
  const user = getUser();
  return user && roles.includes(user.role);
}

function logout() {
  clearAuth();
  window.location.href = '/pages/login.html';
}

function getAuthHeaders(extra = {}) {
  const headers = { ...extra };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function authFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
      ...(options.headers || {})
    })
  });

  if (response.status === 401) {
    clearAuth();
    window.location.href = '/pages/login.html';
    throw new Error('Session expired. Please log in again.');
  }

  return response;
}

function redirectByRole(user) {
  switch (user.role) {
    case 'admin':
      window.location.href = 'landingPage.html';
      break;
    case 'teacher':
      window.location.href = 'teacherAttendance.html';
      break;
    case 'student':
    default:
      window.location.href = 'landingPage.html';
      break;
  }
}
