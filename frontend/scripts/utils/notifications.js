/**
 * Toast-style notification utility (settings & achievements).
 */
function showNotification(message, className = 'notification') {
  const notification = document.createElement('div');
  notification.className = className;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showAchievementNotification(title, level) {
  const notification = document.createElement('div');
  notification.className = 'notification achievement-notification';
  notification.innerHTML = `
    <i class="fas fa-trophy"></i>
    <div>
      <strong>Achievement Unlocked!</strong>
      <p>${title} - ${level}</p>
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}
