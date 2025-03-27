document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsDisplay = document.getElementById('packets');
  const statusDisplay = document.getElementById('status');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const sidePanel = document.getElementById('sidePanel');
  const contentArea = document.getElementById('contentArea');
  const tabs = document.querySelectorAll('.tab-button');

  let attackRunning = false;
  let startTime;
  let intervalId;

  // Function to update statistics display
  function updateStatistics(data) {
    mbpsDisplay.textContent = data.mbps;
    packetsDisplay.textContent = data.packets;
    statusDisplay.textContent = data.status;
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeElapsedDisplay.textContent = elapsedTime;
  }

  // Function to handle tab selection
  function openTab(tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    // Remove 'active' class from all tab buttons and add to the current one
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
  }

  // Attach event listeners to tab buttons
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      const tabName = event.target.getAttribute('data-tab');
      openTab(tabName);
    });
  });

  // Initial tab setup - open the first tab by default ('DDoS')
  openTab('DDoS');

  attackButton.addEventListener('click', async () => {
    if (attackRunning) {
      clearInterval(intervalId);
      attackButton.textContent = 'Start Attack';
      attackRunning = false;
      return;
    }

    const target = targetInput.value;
    const attackType = attackSelect.value;

    if (!target) {
      alert('Please enter a target URL.');
      return;
    }

    attackButton.textContent = 'Stop Attack';
    attackRunning = true;
    startTime = Date.now();

    // Start statistics update interval
    intervalId = setInterval(() => {
      // Mocked statistics data
      const stats = {
        mbps: Math.random() * 100,
        packets: Math.floor(Math.random() * 1000),
        status: 'Online'
      };
      updateStatistics(stats);
    }, 1000);

    // Send the attack request to the server
    try {
      const response = await fetch('/main/attack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: target, attackType: attackType })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error starting attack:', error);
      clearInterval(intervalId);
      attackButton.textContent = 'Start Attack';
      attackRunning = false;
    }
  });
});