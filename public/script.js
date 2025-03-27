document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const elapsedTimeDisplay = document.getElementById('elapsedTime');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  let attackStartTime;
  let attackInterval;

  function showTab(tabId) {
    tabContents.forEach(content => {
      content.style.display = 'none';
    });
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      const tabId = event.target.dataset.tab;
      showTab(tabId);
    });
  });

  showTab('ddos');

  function updateStatistics(mbps, packetsSent, connectionStatus) {
    mbpsDisplay.textContent = mbps;
    packetsSentDisplay.textContent = packetsSent;
    connectionStatusDisplay.textContent = connectionStatus;
  }

  function formatTime(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  function startAttackSimulation(targetUrl, attackType) {
    attackStartTime = Date.now();
    attackInterval = setInterval(() => {
      const elapsedTime = Date.now() - attackStartTime;
      elapsedTimeDisplay.textContent = formatTime(elapsedTime);

      const randomMbps = Math.random() * 100;
      const randomPackets = Math.floor(Math.random() * 1000);
      const statusOptions = ['Online', 'Offline', 'Unresponsive'];
      const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

      updateStatistics(randomMbps.toFixed(2), randomPackets, randomStatus);
    }, 1000);
  }

  function stopAttackSimulation() {
    clearInterval(attackInterval);
  }

  attackButton.addEventListener('click', async () => {
    const targetUrl = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (attackButton.textContent === 'Start Attack') {
      attackButton.textContent = 'Stop Attack';
      startAttackSimulation(targetUrl, attackType);
    } else {
      attackButton.textContent = 'Start Attack';
      stopAttackSimulation();
      updateStatistics('0.00', '0', 'Unknown');
      elapsedTimeDisplay.textContent = '00:00:00';
    }
  });
});