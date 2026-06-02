document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  submitBtn.innerHTML = 'Logging in...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(apiUrl(API_CONFIG.endpoints.login), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      setAuth(data.token, data.user);
      showAlert('alert-container', 'success', data.message || 'Login successful!');
      setTimeout(() => redirectByRole(data.user), 800);
    } else {
      showAlert('alert-container', 'danger', data.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    showAlert('alert-container', 'danger', 'An error occurred. Please try again later.');
    console.error('Login error:', error);
  } finally {
    submitBtn.innerHTML = 'Login';
    submitBtn.disabled = false;
  }
});
