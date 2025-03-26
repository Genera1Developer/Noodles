document.addEventListener('DOMContentLoaded', () => {
  const attackButton = document.getElementById('attackButton');
  const targetUrlInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const statusDiv = document.getElementById('status');
  const logsDiv = document.getElementById('logs');
  const statsDiv = document.getElementById('stats');
  const defaceButton = document.getElementById('defaceButton');
  const defaceUrlInput = document.getElementById('defaceUrl');
  const defaceCodeInput = document.getElementById('defaceCode');
  const connectButton = document.getElementById('connectButton');
  const connectUrlInput = document.getElementById('connectUrl');
  const ransomwareButton = document.getElementById('ransomwareButton');
  const ransomwareUrlInput = document.getElementById('ransomwareUrl');

  function logMessage(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logsDiv.appendChild(logEntry);
    logsDiv.scrollTop = logsDiv.scrollHeight;
  }

  function updateStats(data) {
    statsDiv.innerHTML = `
      <p>MBPS: ${data.mbps}</p>
      <p>Packets Sent: ${data.packetsSent}</p>
      <p>Connection Status: ${data.connectionStatus}</p>
    `;
  }

  attackButton.addEventListener('click', async () => {
    const targetUrl = targetUrlInput.value;
    const attackType = attackTypeSelect.value;

    if (!targetUrl) {
      alert('Please enter a target URL.');
      return;
    }

    statusDiv.textContent = 'Attacking...';
    logMessage(`Initiating ${attackType} attack on ${targetUrl}`);

    try {
      const response = await fetch('/api/attack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetUrl, attackType }),
      });

      const data = await response.json();

      if (response.ok) {
        statusDiv.textContent = data.message;
        logMessage(data.message);
        updateStats(data.stats);
      } else {
        statusDiv.textContent = `Error: ${data.error}`;
        logMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      statusDiv.textContent = `An error occurred: ${error.message}`;
      logMessage(`An error occurred: ${error.message}`);
    }
  });

  defaceButton.addEventListener('click', async () => {
    const defaceUrl = defaceUrlInput.value;
    const defaceCode = defaceCodeInput.value;

    if (!defaceUrl || !defaceCode) {
      alert('Please enter a deface URL and code.');
      return;
    }

    statusDiv.textContent = 'Defacing...';
    logMessage(`Attempting to deface ${defaceUrl}`);

    try {
      const response = await fetch('/api/deface', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ defaceUrl, defaceCode }),
      });

      const data = await response.json();

      if (response.ok) {
        statusDiv.textContent = data.message;
        logMessage(data.message);
      } else {
        statusDiv.textContent = `Error: ${data.error}`;
        logMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      statusDiv.textContent = `An error occurred: ${error.message}`;
      logMessage(`An error occurred: ${error.message}`);
    }
  });

    connectButton.addEventListener('click', async () => {
    const connectUrl = connectUrlInput.value;

    if (!connectUrl) {
      alert('Please enter a URL to connect to.');
      return;
    }

    statusDiv.textContent = 'Connecting...';
    logMessage(`Attempting to connect to ${connectUrl}`);

    try {
      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        statusDiv.textContent = data.message;
        logMessage(data.message);
      } else {
        statusDiv.textContent = `Error: ${data.error}`;
        logMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      statusDiv.textContent = `An error occurred: ${error.message}`;
      logMessage(`An error occurred: ${error.message}`);
    }
  });

  ransomwareButton.addEventListener('click', async () => {
        const ransomwareUrl = ransomwareUrlInput.value;

        if (!ransomwareUrl) {
            alert("Please enter a URL to send ransomware to.");
            return;
        }

        statusDiv.textContent = "Sending Ransomware...";
        logMessage(`Attempting to send ransomware to ${ransomwareUrl}`);

        try {
            const response = await fetch('/api/ransomware', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ransomwareUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });
});