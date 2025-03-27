document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const targetStatusDisplay = document.getElementById('targetStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const durationInput = document.getElementById('duration');
  const intensityInput = document.getElementById('intensity');

  let attackStartTime;
  let attackInterval;

  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;
    const duration = parseInt(durationInput.value);
    const intensity = parseInt(intensityInput.value);

    if (!target || !attackType || !duration || !intensity) {
      alert('Please fill in all fields.');
      return;
    }

    attackButton.disabled = true;
    targetInput.disabled = true;
    attackTypeSelect.disabled = true;
    durationInput.disabled = true;
    intensityInput.disabled = true;

    attackStartTime = Date.now();
    updateStats(0, 0, 'Starting...', 0);

    attackInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
      timeElapsedDisplay.textContent = `Time Elapsed: ${elapsedTime}s`;
    }, 1000);

    try {
      const result = await startAttack(target, attackType, duration, intensity);
      clearInterval(attackInterval);
      updateStats(result.mbps, result.packetsSent, result.targetStatus, Math.floor((Date.now() - attackStartTime) / 1000));
    } catch (error) {
      console.error('Attack failed:', error);
      updateStats(0, 0, 'Failed', Math.floor((Date.now() - attackStartTime) / 1000));
      clearInterval(attackInterval);
    } finally {
      attackButton.disabled = false;
      targetInput.disabled = false;
      attackTypeSelect.disabled = false;
      durationInput.disabled = false;
      intensityInput.disabled = false;
    }
  });

  async function startAttack(target, attackType, duration, intensity) {
    const response = await fetch(`/main/attack/${attackType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ target, duration, intensity })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  function updateStats(mbps, packetsSent, targetStatus, elapsedTime) {
    mbpsDisplay.textContent = `MBPS: ${mbps.toFixed(2)}`;
    packetsSentDisplay.textContent = `Packets Sent: ${packetsSent}`;
    targetStatusDisplay.textContent = `Target Status: ${targetStatus}`;
    timeElapsedDisplay.textContent = `Time Elapsed: ${elapsedTime}s`;
  }

  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      button.classList.add('active');
      const target = button.dataset.target;
      document.getElementById(target).classList.add('active');
    });
  });

  document.querySelector('.tab-button[data-target="ddos"]').click();
});