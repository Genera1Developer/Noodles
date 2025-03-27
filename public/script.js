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
  let packetsSent = 0;

  function updateStatistics(mbps, status) {
    mbpsDisplay.textContent = `MBPS: ${mbps}`;
    packetsSentDisplay.textContent = `Packets Sent: ${packetsSent}`;
    connectionStatusDisplay.textContent = `Status: ${status}`;
  }

  function simulateAttack(target, attackType) {
    attackStartTime = Date.now();
    packetsSent = 0;
    connectionStatusDisplay.textContent = 'Status: Online';

    attackInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
      timeElapsedDisplay.textContent = `Time Elapsed: ${elapsedTime}s`;
      packetsSent += 100;
      const mbps = Math.random() * 10 + 5;

      updateStatistics(mbps.toFixed(2), 'Online');
    }, 100);

    setTimeout(() => {
      clearInterval(attackInterval);
      connectionStatusDisplay.textContent = 'Status: Offline';
      timeElapsedDisplay.textContent = `Time Elapsed: ${Math.floor((Date.now() - attackStartTime) / 1000)}s`;
    }, 10000);
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;
    simulateAttack(target, attackType);
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