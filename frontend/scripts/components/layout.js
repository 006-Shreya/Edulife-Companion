const EDU_NAV = [
  { href: 'landingPage.html', icon: 'fa-th-large', label: 'Dashboard' },
  { href: 'home.html', icon: 'fa-chart-line', label: 'Study Tracker' },
  { href: 'attendance1.html', icon: 'fa-user-check', label: 'Attendance' },
  { href: 'pomodoro.html', icon: 'fa-stopwatch', label: 'Pomodoro' },
  { href: 'chat.html', icon: 'fa-comments', label: 'AI Chat' },
  { href: 'expenseTracker.html', icon: 'fa-wallet', label: 'Expenses' },
  { href: 'timeTable.html', icon: 'fa-calendar-alt', label: 'Timetable' },
  { href: 'reminder.html', icon: 'fa-bell', label: 'Reminders' },
  { href: 'upload.html', icon: 'fa-upload', label: 'Documents' },
  { href: 'settings.html', icon: 'fa-cog', label: 'Settings' }
];

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'landingPage.html';
}

function initEduLayout() {
  const sidebar = document.getElementById('edl-sidebar');
  const overlay = document.getElementById('edl-overlay');
  const menuBtn = document.getElementById('edl-menu-btn');
  const current = getCurrentPage();

  if (!sidebar) return;

  document.querySelectorAll('.edl-sidebar-nav a').forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

  const user = typeof getUser === 'function' ? getUser() : null;
  const greeting = document.getElementById('user-greeting');
  if (greeting && user) {
    greeting.textContent = user.fullName;
    greeting.title = `${user.role} account`;
  }

  function openSidebar() {
    sidebar.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    if (sidebar.classList.contains('open')) closeSidebar();
    else openSidebar();
  }

  menuBtn?.addEventListener('click', toggleSidebar);
  overlay?.addEventListener('click', closeSidebar);

  document.querySelectorAll('[data-edl-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (typeof toggleTheme === 'function') toggleTheme();
    });
  });

  window.toggleSidebar = toggleSidebar;
  window.closeEduSidebar = closeSidebar;

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeSidebar();
  });
}

document.addEventListener('DOMContentLoaded', initEduLayout);
