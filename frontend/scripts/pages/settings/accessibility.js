function initAccessibilitySettings() {
  const fontSize = document.getElementById('fontSize');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const contrastToggle = document.getElementById('contrastToggle');
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (fontSize && fontSizeValue) {
    fontSize.addEventListener('input', function () {
      document.documentElement.style.fontSize = fontSize.value + 'px';
      fontSizeValue.textContent = fontSize.value + 'px';
    });
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('change', function () {
      document.documentElement.classList.toggle('high-contrast', contrastToggle.checked);
    });
  }

  if (darkModeToggle && typeof setTheme === 'function') {
    darkModeToggle.checked = getTheme() === 'dark';
    darkModeToggle.addEventListener('change', function () {
      setTheme(darkModeToggle.checked ? 'dark' : 'light');
    });
  }
}

function applyAccessibilityFromSettings(settings) {
  const fontSize = document.getElementById('fontSize');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const contrastToggle = document.getElementById('contrastToggle');

  if (fontSize) {
    fontSize.value = settings.fontSize || 16;
    document.documentElement.style.fontSize = (settings.fontSize || 16) + 'px';
  }
  if (fontSizeValue) fontSizeValue.textContent = (settings.fontSize || 16) + 'px';

  if (contrastToggle) {
    contrastToggle.checked = settings.highContrast || false;
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
  }

  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle && typeof setTheme === 'function') {
    const isDark = settings.darkMode || getTheme() === 'dark';
    darkModeToggle.checked = isDark;
    if (settings.darkMode !== undefined) setTheme(isDark ? 'dark' : 'light');
  }
}
