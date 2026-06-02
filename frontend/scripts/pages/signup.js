document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.innerHTML = 'Signing Up...';
  submitBtn.disabled = true;

  const formData = {
    fullName: this.fullName.value,
    email: this.email.value,
    password: this.password.value,
    role: 'student'
  };

  try {
    const response = await fetch(apiUrl(API_CONFIG.endpoints.signup), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token && data.user) {
        setAuth(data.token, data.user);
      }
      showAlert('alert-container', 'success', data.message || 'Registration successful!');
      this.reset();
      setTimeout(() => {
        if (data.user) {
          redirectByRole(data.user);
        } else {
          window.location.href = 'login.html';
        }
      }, 1500);
    } else {
      showAlert('alert-container', 'danger', data.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    showAlert('alert-container', 'danger', 'An error occurred. Please try again later.');
    console.error('Signup error:', error);
  } finally {
    submitBtn.innerHTML = 'Sign Up';
    submitBtn.disabled = false;
  }
});
