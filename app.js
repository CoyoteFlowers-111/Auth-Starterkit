let currentToken = null;

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  const data = await res.json();
  const msg = document.getElementById('reg-message');
  msg.textContent = res.ok ? 'Account created — now log in.' : (data.error || 'Registration failed.');
  msg.className = 'message ' + (res.ok ? 'success' : 'error');
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  const data = await res.json();
  const msg = document.getElementById('login-message');
  if (res.ok) {
    currentToken = data.token;
    msg.textContent = `Logged in. Token valid for ${data.expires_in_minutes} minutes.`;
    msg.className = 'message success';
  } else {
    msg.textContent = data.error || 'Login failed.';
    msg.className = 'message error';
  }
});

document.getElementById('protected-btn').addEventListener('click', async () => {
  const resultEl = document.getElementById('protected-result');
  if (!currentToken) {
    resultEl.textContent = 'Log in first to get a token.';
    return;
  }
  const res = await fetch('/api/protected', {
    headers: {'Authorization': `Bearer ${currentToken}`}
  });
  const data = await res.json();
  resultEl.textContent = JSON.stringify(data, null, 2);
});
