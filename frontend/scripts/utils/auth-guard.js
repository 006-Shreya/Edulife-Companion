/**
 * Redirects to login if no valid session on protected pages.
 */
(function () {
  const publicPages = ['login.html', 'signup.html', 'aboutUs.html', 'contact.html'];
  const currentPage = window.location.pathname.split('/').pop();

  if (publicPages.includes(currentPage)) return;
  if (!isLoggedIn()) {
    window.location.href = '/pages/login.html';
  }
})();
