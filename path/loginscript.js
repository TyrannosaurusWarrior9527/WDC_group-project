// loginscript.js
document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('loginForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    message.textContent = '';

    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) {
      alert('username and password cannot be empty');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        // register successfully, go to mainpage
        window.location.href = 'homePage.html';
      } else {
        // register failed
        alert(data.message || 'register failed');
      }
    } catch (err) {
      // data error
      console.error(err);
      alert('Network error, try again later');
    }
  });
});
