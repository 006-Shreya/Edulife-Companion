/**
 * Bootstrap-style alert helper for auth pages.
 */
function showAlert(containerId, type, message, duration = 5000) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;

  setTimeout(() => {
    container.innerHTML = '';
  }, duration);
}
