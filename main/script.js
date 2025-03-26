document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackSelect = document.getElementById('attackSelect');
  const attackButton = document.getElementById('attackButton');
  const statusBox = document.getElementById('statusBox');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packets');
  const targetStatusDisplay = document.getElementById('targetStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');

  let startTime;

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackSelect.value;

    if (!target) {
      updateStatus('Target cannot be empty.');
      return;
    }

    startTime = new Date();
    updateStatus(`Attack started: ${attackType} on ${target}`);
    startAttack(target, attackType);
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

  // Fetch about us content
  fetch('/about.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('about-us-content').innerHTML = data;
    })
    .catch(error => console.error('Error fetching about us:', error));

    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', function() {
          const tab = this.getAttribute('data-tab');
          openTab(tab);
      });
  });

  function openTab(tabId) {
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
          content.style.display = 'none';
      });

      // Remove active class from all tab buttons
      document.querySelectorAll('.tab-button').forEach(button => {
          button.classList.remove('active');
      });

      // Show the selected tab content
      document.getElementById(tabId).style.display = 'block';

      // Add active class to the clicked button
      document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  }

  // Open default tab on page load
  openTab('ddos');
});