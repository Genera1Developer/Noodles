document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const intensityInput = document.getElementById('intensity');
  const durationInput = document.getElementById('duration');
  const startButton = document.getElementById('startAttack');
  const statusDisplay = document.getElementById('statusDisplay');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const sidePanel = document.querySelector('.side-panel');
  const tabButtons = document.querySelectorAll('.tab-button');
  let attackStartTime;

  function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      showTab(tabId);
    });
  });

  showTab('ddos');

  async function updateStats(attackStatus) {
    mbpsDisplay.textContent = attackStatus.mbps;
    packetsSentDisplay.textContent = attackStatus.packetsSent;
    connectionStatusDisplay.textContent = attackStatus.targetStatus;
    const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
    timeElapsedDisplay.textContent = elapsedTime;
  }

  async function startAttack(target, attackType, intensity, duration) {
    statusDisplay.textContent = 'Attack started...';
    attackStartTime = Date.now();

    try {
      const response = await fetch('/main/attack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target, attackType, intensity, duration })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      let partialData = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        partialData += new TextDecoder().decode(value);
        const messages = partialData.split('\n');

        for (let i = 0; i < messages.length - 1; i++) {
          const message = messages[i];
          if (message) {
            try {
              const attackStatus = JSON.parse(message);
              updateStats(attackStatus);
            } catch (e) {
              console.error("Error parsing JSON:", e, message);
            }
          }
        }
        partialData = messages[messages.length - 1];
      }
      statusDisplay.textContent = 'Attack finished.';

    } catch (error) {
      console.error('Attack error:', error);
      statusDisplay.textContent = `Attack failed: ${error.message}`;
    }
  }

  startButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;
    const intensity = parseInt(intensityInput.value);
    const duration = parseInt(durationInput.value);

    if (target && attackType && intensity && duration) {
      startAttack(target, attackType, intensity, duration);
    } else {
      statusDisplay.textContent = 'Please fill in all fields.';
    }
  });
});