/**
 * Shared sidebar toggle — used by dashboard-style pages.
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  if (sidebar) sidebar.classList.toggle('open');
  if (mainContent) mainContent.classList.toggle('shift');
}
