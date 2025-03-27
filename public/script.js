document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('target');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const statusDisplay = document.getElementById('statusDisplay');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContent = document.querySelectorAll('.tab-content');

  let statsInterval; // Store the interval ID

  function showTab(tabId) {
    tabContent.forEach(content => content.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('active'));
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

  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (!target) {
      updateStatus('error', 'Target is required.');
      return;
    }

    // Clear any existing stats interval
    if (statsInterval) {
      clearInterval(statsInterval);
      statsInterval = null;
    }

    updateStatus('info', `Initiating ${attackType} attack on ${target}...`);

    try {
      const response = await fetch(`/main/api.js?action=${attackType}&target=${target}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        updateStatus('success', data.message || 'Attack initiated successfully.');
        startStatsUpdates(target);
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Attack failed and could not parse error response.' };
        }
        updateStatus('error', errorData.message || 'Attack failed to initiate.');
      }
    } catch (error) {
      updateStatus('error', `Error initiating attack: ${error.message}`);
    }
  });

  function updateStatus(status, message) {
    statusDisplay.textContent = `Status: ${status} - ${message}`;
  }

  async function fetchStats(target) {
    try {
      const response = await fetch(`/main/stats.js?target=${target}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        mbpsDisplay.textContent = `MBPS: ${data.mbps || 0}`;
        packetsSentDisplay.textContent = `Packets Sent: ${data.packetsSent || 0}`;
        connectionStatusDisplay.textContent = `Connection: ${data.connectionStatus || 'Unknown'}`;
        timeElapsedDisplay.textContent = `Time Elapsed: ${data.timeElapsed || '0s'}`;
      } else {
        console.error('Failed to fetch stats:', response.status, response.statusText);
        // Consider updating the status display to indicate stats fetching failure
        updateStatus('error', `Failed to fetch stats: ${response.statusText}`);
        clearInterval(statsInterval); // Stop trying to fetch stats
        statsInterval = null;
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
       updateStatus('error', `Error fetching stats: ${error.message}`);
      clearInterval(statsInterval); // Stop trying to fetch stats
      statsInterval = null;
    }
  }

  function startStatsUpdates(target) {
    // Ensure only one interval is running
    if (statsInterval) {
      clearInterval(statsInterval);
    }

    statsInterval = setInterval(() => {
      fetchStats(target);
    }, 2000);
  }
});