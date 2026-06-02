const THEME_KEY = 'edulifeTheme';

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

function setTheme(theme) {
  const value = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem(THEME_KEY, value);
  updateThemeToggleIcon(value);
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

function updateThemeToggleIcon(theme) {
  document.querySelectorAll('[data-edl-theme-toggle]').forEach((btn) => {
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
}

function initTheme() {
  setTheme(getTheme());
}

initTheme();
