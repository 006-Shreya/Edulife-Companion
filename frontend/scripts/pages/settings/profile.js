function initProfileSettings() {
  const avatarInput = document.getElementById('avatarInput');
  const avatar = document.getElementById('avatar');
  const avatarContainer = document.querySelector('.avatar-container');

  if (!avatarInput || !avatar || !avatarContainer) return;

  avatarContainer.addEventListener('click', () => avatarInput.click());

  avatarInput.addEventListener('change', function () {
    const file = avatarInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatar.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}
