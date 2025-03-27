document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const statusDisplay = document.getElementById('statusDisplay');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const sidePanel = document.querySelector('.side-panel');
  const tabs = document.querySelectorAll('.tab-button');
  let attackStartTime;

  function updateStatus(message) {
    statusDisplay.textContent = message;
  }

  function updateStatistics(mbps, packets, status, time) {
    mbpsDisplay.textContent = mbps;
    packetsSentDisplay.textContent = packets;
    connectionStatusDisplay.textContent = status;
    timeElapsedDisplay.textContent = time;
  }

  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (!target) {
      updateStatus('Please enter a target URL or .onion address.');
      return;
    }

    updateStatus(`Starting ${attackType} attack on ${target}...`);
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
        const errorData = await response.json();
        updateStatus(`Attack failed: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const attackData = await response.json();
      const attackInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
        updateStatistics(
          attackData.mbps || 'N/A',
          attackData.packets || 'N/A',
          attackData.status || 'N/A',
          `${elapsedTime}s`
        );
      }, 1000);

      setTimeout(() => {
        clearInterval(attackInterval);
        updateStatus('Attack finished.');
      }, 60000);
    } catch (error) {
      updateStatus(`Attack failed: ${error.message}`);
    }
  });

  tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetPage = tab.getAttribute('data-page');
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
        });
    });
});