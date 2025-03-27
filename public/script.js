document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  let attackStartTime;
  let attackInterval;

  function updateStatistics(mbps, packetsSent, status) {
    mbpsDisplay.textContent = `MBPS: ${mbps}`;
    packetsSentDisplay.textContent = `Packets Sent: ${packetsSent}`;
    connectionStatusDisplay.textContent = `Status: ${status}`;
  }

  function startAttack(target, attackType) {
    attackStartTime = Date.now();
    attackInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
      timeElapsedDisplay.textContent = `Time Elapsed: ${elapsedTime}s`;
    }, 1000);

    fetch('main/attack.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ target: target, attackType: attackType }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Attack started:', data);
        updateStatistics(data.mbps, data.packetsSent, 'Online');
      })
      .catch(error => {
        console.error('Error starting attack:', error);
        updateStatistics(0, 0, 'Offline');
      });
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;
    startAttack(target, attackType);
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

    document.querySelector('.tab-button[data-tab="ddos"]').click();
});