// script.js

// ------------------- Password Leak Check -------------------

async function checkPasswordLeak(password) {
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'none';

  try {
    const response = await fetch('http://localhost:10000/api/check-password', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const result = await response.json();

    resultDiv.style.display = 'block';
    if (result.pwned) {
      resultDiv.className = 'result danger';
      resultDiv.innerHTML = `⚠️ <strong>Warning:</strong> This password was found in <strong>${result.count}</strong> breaches!<br>❌ Please change your password immediately.`;
    } else {
      resultDiv.className = 'result safe';
      resultDiv.innerHTML = `✅ <strong>Good news:</strong> Your password was NOT found in any known breaches.`;
    }

  } catch (error) {
    alert('❌ Error checking password. Please make sure the backend server is running.');
    console.error('Error:', error);
  }
}

function handleCheckPassword() {
  const password = document.getElementById('passwordInput').value.trim();
  if (password.length === 0) {
    alert('⚠️ Please enter a password.');
    return;
  }
  checkPasswordLeak(password);
}

// ------------------- Email Breach Check -------------------

function handleCheckEmail() {
  const email = document.getElementById('emailInput').value.trim();
  if (email.length === 0 || !email.includes('@')) {
    alert('⚠️ Please enter a valid email address.');
    return;
  }

  // Explain to user what will happen
  const confirmMsg = `We will redirect you to HaveIBeenPwned.com to check breaches for:\n\n${email}\n\nClick OK to proceed.`;
  if (confirm(confirmMsg)) {
    const encodedEmail = encodeURIComponent(email);
    const hibpUrl = `https://haveibeenpwned.com/account/${encodedEmail}`;
    window.open(hibpUrl, '_blank');
  }
}
