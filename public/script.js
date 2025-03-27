document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const statusDisplay = document.getElementById('statusDisplay');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  let attackStartTime;
  let packetsSent = 0;

  function updateStatus(message) {
    statusDisplay.textContent = message;
  }

  function updateStatistics(mbps, packets, connection, time) {
    mbpsDisplay.textContent = `MBPS: ${mbps}`;
    packetsSentDisplay.textContent = `Packets Sent: ${packets}`;
    connectionStatusDisplay.textContent = `Connection: ${connection}`;
    timeElapsedDisplay.textContent = `Time: ${time}`;
  }

  function startAttack(target, attackType) {
    attackStartTime = Date.now();
    packetsSent = 0;
    updateStatus(`Starting ${attackType} attack on ${target}...`);
    
    const intervalId = setInterval(() => {
      const timeElapsed = (Date.now() - attackStartTime) / 1000;
      updateStatistics('N/A', packetsSent, 'Online', `${timeElapsed.toFixed(2)}s`);
    }, 1000);

    fetch('/main/attack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ target: target, attackType: attackType })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        updateStatus(`${attackType} attack launched successfully.`);
        packetsSent = data.packetsSent || 0;

      } else {
        updateStatus(`Attack failed: ${data.message}`);
      }
    })
    .catch(error => {
      updateStatus(`Error launching attack: ${error}`);
    })
    .finally(() => {
      clearInterval(intervalId);
    });
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (!target) {
      updateStatus('Please enter a target URL or .onion address.');
      return;
    }

    startAttack(target, attackType);
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  updateStatistics('0', '0', 'Idle', '0s');
});