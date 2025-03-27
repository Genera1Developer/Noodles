document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const targetStatusDisplay = document.getElementById('targetStatus');
  const elapsedTimeDisplay = document.getElementById('elapsedTime');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContent = document.querySelectorAll('.tab-content');

  let attackInterval;
  let startTime;

  function updateStatistics(data) {
    mbpsDisplay.textContent = data.mbps ? data.mbps.toFixed(2) : '0.00';
    packetsSentDisplay.textContent = data.packetsSent || '0';
    targetStatusDisplay.textContent = data.targetStatus || 'Unknown';
  }

  async function executeAttack(target, attackType) {
    clearInterval(attackInterval);
    startTime = Date.now();

    attackInterval = setInterval(async () => {
      try {
        const response = await fetch(`/main/api/${attackType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ target: target, duration: 10, intensity: 5 })
        });

        if (response.ok) {
          const data = await response.json();
          updateStatistics(data);
        } else {
          console.error('Attack failed:', response.status);
          updateStatistics({ targetStatus: 'Failed' });
        }
      } catch (error) {
        console.error('Error during attack:', error);
        updateStatistics({ targetStatus: 'Error' });
      }

      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      elapsedTimeDisplay.textContent = elapsedTime + ' seconds';
    }, 1000);
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (target && attackType) {
      executeAttack(target, attackType);
    } else {
      alert('Please enter a target and select an attack type.');
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContent.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.dataset.target;
      document.getElementById(target).classList.add('active');
    });
  });
});