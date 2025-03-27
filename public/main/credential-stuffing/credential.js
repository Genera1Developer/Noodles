document.addEventListener('DOMContentLoaded', function() {
  const credentialForm = document.getElementById('credential-stuffing-form');
  if (credentialForm) {
    credentialForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const targetUrl = document.getElementById('target-url').value;
      const usernameList = document.getElementById('username-list').value;
      const passwordList = document.getElementById('password-list').value;

      if (!targetUrl || !usernameList || !passwordList) {
        alert('Please fill in all fields.');
        return;
      }

      const usernames = usernameList.split('\n').filter(Boolean);
      const passwords = passwordList.split('\n').filter(Boolean);

      if (usernames.length === 0 || passwords.length === 0) {
        alert('Username and password lists cannot be empty.');
        return;
      }

      try {
          new URL(targetUrl);
      } catch (_) {
          alert('Invalid target URL.');
          return;
      }

      const payload = {
        targetUrl: targetUrl,
        usernames: usernames,
        passwords: passwords
      };

      fetch('/main/credential-stuffing/stuff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        alert(data.message || 'Credential stuffing attack initiated.');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to initiate credential stuffing attack: ' + error.message);
      });
    });
  } else {
    console.error('Credential stuffing form not found.');
  }
});