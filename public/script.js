document.addEventListener('DOMContentLoaded', () => {
  // Dark theme implementation
  const applyTheme = () => {
    document.body.style.backgroundColor = 'darkgrey';
    document.body.style.color = 'darkgreen';

    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      panel.style.backgroundColor = 'darkblue';
      panel.style.border = '1px solid darkgreen';
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.backgroundColor = 'grey';
      button.style.color = 'darkgreen';
      button.style.border = '1px solid darkgreen';
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.style.backgroundColor = 'grey';
      button.style.color = 'darkgreen';
      button.style.border = '1px solid darkgreen';
    });

    const inputFields = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputFields.forEach(input => {
      input.style.backgroundColor = 'grey';
      input.style.color = 'darkgreen';
      input.style.border = '1px solid darkgreen';
    });
  };

  applyTheme();

  // Tab functionality
  const tabs = document.querySelectorAll('.tab-button');
  const tabContent = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();

      const tabId = tab.getAttribute('data-tab');

      tabContent.forEach(content => {
        content.classList.remove('active');
      });

      tabs.forEach(t => {
        t.classList.remove('active');
      });

      tab.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Attack functions
  const ddosForm = document.getElementById('ddos-form');
  if (ddosForm) {
    ddosForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = document.getElementById('ddos-target').value;
      const type = document.getElementById('ddos-type').value;
      const duration = document.getElementById('ddos-duration').value;
      const intensity = document.getElementById('ddos-intensity').value;

      try {
        const response = await fetch('/main/ddos/attack', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ target, type, duration, intensity })
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  const defaceForm = document.getElementById('deface-form');
  if (defaceForm) {
    defaceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = document.getElementById('deface-target').value;
      const image = document.getElementById('deface-image').value;
      const message = document.getElementById('deface-message').value;

      try {
        const response = await fetch('/main/deface/attack', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ target, image, message })
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  const connectionForm = document.getElementById('connection-form');
  if (connectionForm) {
    connectionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = document.getElementById('connection-target').value;
      const port = document.getElementById('connection-port').value;

      try {
        const response = await fetch('/main/connection/attack', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ target, port })
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  const credentialForm = document.getElementById('credential-form');
  if (credentialForm) {
    credentialForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = document.getElementById('credential-target').value;
      const usernameList = document.getElementById('credential-usernames').value;
      const passwordList = document.getElementById('credential-passwords').value;

      try {
        const response = await fetch('/main/credential/attack', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ target, usernameList, passwordList })
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  // Statistics display (example - needs actual implementation)
  const updateStats = () => {
    document.getElementById('mbps').innerText = 'N/A';
    document.getElementById('packets').innerText = 'N/A';
    document.getElementById('status').innerText = 'N/A';
    document.getElementById('time').innerText = 'N/A';
  };

  setInterval(updateStats, 2000);
});