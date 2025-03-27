document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const elapsedTimeDisplay = document.getElementById('elapsedTime');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContent = document.querySelectorAll('.tab-content');

  let attackStartTime;
  let attackInterval;

  function updateStatistics(mbps, packets, status) {
    mbpsDisplay.textContent = `MBPS: ${mbps}`;
    packetsSentDisplay.textContent = `Packets Sent: ${packets}`;
    connectionStatusDisplay.textContent = `Status: ${status}`;
    const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
    elapsedTimeDisplay.textContent = `Time: ${elapsedTime}s`;
  }

  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (!target) {
      alert('Please enter a target URL or .onion address.');
      return;
    }

    attackButton.disabled = true;
    attackButton.textContent = 'Attacking...';
    attackStartTime = Date.now();

    try {
      const response = await fetch(`/main/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: target, attackType: attackType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      attackInterval = setInterval(() => {
        const mbps = Math.random() * 10;
        const packets = Math.floor(Math.random() * 1000);
        const status = 'Online';
        updateStatistics(mbps, packets, status);
      }, 1000);

      const result = await response.json();
      console.log(result);

    } catch (error) {
      console.error('Attack failed:', error);
      alert('Attack failed. Check console for details.');
    } finally {
      attackButton.disabled = false;
      attackButton.textContent = 'Start Attack';
      clearInterval(attackInterval);
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContent.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});