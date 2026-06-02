(function () {
  const user = typeof getUser === 'function' ? getUser() : null;
  if (user) {
    const title = document.getElementById('welcome-title');
    if (title) title.textContent = `Welcome back, ${user.fullName.split(' ')[0]}!`;
    const roleEl = document.getElementById('dash-role');
    if (roleEl) roleEl.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  }

  const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const todayHours = studyHistory
    .filter((e) => e.date === todayStr)
    .reduce((sum, e) => sum + e.hours, 0);

  const weekHours = studyHistory.reduce((sum, e) => sum + e.hours, 0);

  const todayEl = document.getElementById('dash-study-today');
  const weekEl = document.getElementById('dash-study-week');
  if (todayEl) todayEl.textContent = `${todayHours}h`;
  if (weekEl) weekEl.textContent = `${weekHours}h`;
})();
