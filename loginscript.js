function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'mainpage.html';  
      } else {
        alert(data.message); 
      }
    })
    .catch(err => {
      alert('网络错误');
      console.error(err);
    });
  }