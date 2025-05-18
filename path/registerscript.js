// for register
document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('registerForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = '';

    const username        = form.username.value.trim();
    const email           = form.email.value.trim();
    const password        = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // verfication section
    if (!username || !email || !password) {
      message.textContent = 'please fill in the complete content';
      return;
    }
    if (password !== confirmPassword) {
      message.textContent = 'two passwords are different';
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        message.style.color = 'green';
        message.textContent = 'registration successful, go to the login page';
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 3000);
      } else {
        message.style.color = 'red';
        message.textContent = data.message || 'registration failed';
      }
    } catch (err) {
      console.error(err);
      message.style.color = 'red';
      message.textContent = 'internet or server error';
    }
  });
});
