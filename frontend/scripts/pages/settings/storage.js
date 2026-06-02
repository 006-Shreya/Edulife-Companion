function loadSettings() {
  const savedSettings = localStorage.getItem('edulifeSettings');
  if (!savedSettings) return;

  const settings = JSON.parse(savedSettings);
  const displayName = document.getElementById('displayName');
  const bio = document.getElementById('bio');
  const studyTime = document.getElementById('studyTime');
  const dailyGoal = document.getElementById('dailyGoal');

  if (displayName) displayName.value = settings.displayName || '';
  if (bio) bio.value = settings.bio || '';
  if (studyTime) studyTime.value = settings.studyTime || 'Morning';
  if (dailyGoal) dailyGoal.value = settings.dailyGoal || 4;

  applyAccessibilityFromSettings(settings);
  applyThemeFromSettings(settings);
}

function initSaveSettings() {
  const saveBtn = document.getElementById('saveBtn');
  const fontSize = document.getElementById('fontSize');
  const contrastToggle = document.getElementById('contrastToggle');
  const primaryColor = document.getElementById('primaryColor');
  const accentColor = document.getElementById('accentColor');

  if (!saveBtn) return;

  saveBtn.addEventListener('click', function () {
    const settings = {
      displayName: document.getElementById('displayName')?.value || '',
      bio: document.getElementById('bio')?.value || '',
      studyTime: document.getElementById('studyTime')?.value || 'Morning',
      dailyGoal: document.getElementById('dailyGoal')?.value || 4,
      fontSize: fontSize?.value || 16,
      highContrast: contrastToggle?.checked || false,
      darkMode: document.getElementById('darkModeToggle')?.checked || false,
      primaryColor: primaryColor?.value || '#003366',
      accentColor: accentColor?.value || '#00aeef'
    };

    if (typeof setTheme === 'function') {
      setTheme(settings.darkMode ? 'dark' : 'light');
    }

    localStorage.setItem('edulifeSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully!');
    if (typeof updateStreak === 'function') {
      updateStreak();
    }
  });
}
