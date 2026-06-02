function updateThemeColor(color, type) {
  document.documentElement.style.setProperty(`--${type}`, color);
}

function initThemeSettings() {
  const primaryColor = document.getElementById('primaryColor');
  const accentColor = document.getElementById('accentColor');

  if (!primaryColor || !accentColor) return;

  primaryColor.addEventListener('input', (e) => updateThemeColor(e.target.value, 'primary'));
  accentColor.addEventListener('input', (e) => updateThemeColor(e.target.value, 'secondary'));
}

function applyThemeFromSettings(settings) {
  const primaryColor = document.getElementById('primaryColor');
  const accentColor = document.getElementById('accentColor');

  if (!primaryColor || !accentColor) return;

  primaryColor.value = settings.primaryColor || '#003366';
  accentColor.value = settings.accentColor || '#00aeef';
  updateThemeColor(settings.primaryColor || '#003366', 'primary');
  updateThemeColor(settings.accentColor || '#00aeef', 'secondary');
}
