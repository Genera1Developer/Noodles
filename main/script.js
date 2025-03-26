document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackSelect = document.getElementById('attackSelect');
  const attackButton = document.getElementById('attackButton');
  const statusBox = document.getElementById('statusBox');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packets');
  const targetStatusDisplay = document.getElementById('targetStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const aboutUsContent = document.getElementById('about-us-content');

  let startTime;
  let attackRunning = false;
  let statisticsInterval;

  attackButton.addEventListener('click', async () => {
    if (attackRunning) {
      updateStatus('Attack in progress. Wait for it to complete.');
      return;
    }

    const target = targetInput.value;
    const attackType = attackSelect.value;

    if (!target) {
      updateStatus('Target cannot be empty.');
      return;
    }

    startTime = new Date();
    attackRunning = true;
    updateStatus(`Attack started: ${attackType} on ${target}`);

    try {
      await startAttack(target, attackType);
    } catch (error) {
      updateStatus(`Error: ${error.message}`);
    } finally {
      attackRunning = false;
      updateStatus('Attack finished.');
      clearInterval(statisticsInterval);
    }
  });

  async function startAttack(target, attackType) {
    try {
      const response = await fetch(`/api/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: target, attackType: attackType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Attack failed: ${response.status}`);
      }

      const attackData = await response.json();
      updateStatus(attackData.message);
      updateStatistics(attackData);

      simulateStatistics(attackData.mbps, attackData.packetsSent, attackData.targetStatus);
    } catch (error) {
      updateStatus(`Error: ${error.message}`);
    }
  }

  function updateStatistics(data) {
    mbpsDisplay.textContent = data.mbps || 'N/A';
    packetsSentDisplay.textContent = data.packetsSent || 'N/A';
    targetStatusDisplay.textContent = data.targetStatus || 'N/A';
    timeElapsedDisplay.textContent = calculateTimeElapsed() || 'N/A';
  }

  function calculateTimeElapsed() {
    if (!startTime) return 'N/A';
    const now = new Date();
    const elapsed = now.getTime() - startTime.getTime();
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function updateStatus(message) {
    statusBox.textContent = message;
    console.log(message);
  }

  setInterval(() => {
    if (startTime) {
      timeElapsedDisplay.textContent = calculateTimeElapsed();
    }
  }, 1000);

  async function loadAboutUs() {
    try {
      const response = await fetch('about.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      aboutUsContent.innerHTML = data;
    } catch (error) {
      console.error('Error fetching about us:', error);
      aboutUsContent.innerHTML = '<p>Failed to load about us content.</p>';
    }
  }

  function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });

    document.querySelectorAll('.tab-button').forEach(button => {
      button.classList.remove('active');
    });

    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  }

  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.getAttribute('data-tab');
      openTab(tab);
    });
  });

  function simulateStatistics(initialMbps, initialPackets, initialTargetStatus) {
    let mbps = initialMbps || 0;
    let packets = initialPackets || 0;
    let targetStatus = initialTargetStatus || 'Unknown';

    statisticsInterval = setInterval(() => {
      mbps += Math.random() * 5;
      packets += Math.floor(Math.random() * 50);

      const statusOptions = ['Online', 'Offline', 'Unresponsive'];
      targetStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

      mbpsDisplay.textContent = mbps.toFixed(2);
      packetsSentDisplay.textContent = packets;
      targetStatusDisplay.textContent = targetStatus;

      if (!attackRunning) {
        clearInterval(statisticsInterval);
      }
    }, 500);
  }

  openTab('ddos');
  loadAboutUs();
});