document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const statusDisplay = document.getElementById('statusDisplay');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const targetStatusDisplay = document.getElementById('targetStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  let attackStartTime;
  let packetsSent = 0;

  // Function to update statistics
  function updateStatistics(data) {
    if (data.packets) {
      packetsSent = data.packets;
      packetsSentDisplay.textContent = `Packets Sent: ${packetsSent}`;
    }
    if (data.status) {
      statusDisplay.textContent = `Status: ${data.status}`;
    }
    // Example: Update target status.  Needs backend implementation.
    if (data.targetStatus) {
      targetStatusDisplay.textContent = `Target Status: ${data.targetStatus}`;
    }
  }

  // Function to start attack and update statistics
  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (!target) {
      statusDisplay.textContent = 'Error: Target is required.';
      return;
    }

    statusDisplay.textContent = 'Starting attack...';
    attackStartTime = Date.now();
    packetsSent = 0;

    // Simulate attack and statistics updates
    const intervalId = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
      timeElapsedDisplay.textContent = `Time Elapsed: ${elapsedTime} seconds`;

      // Call backend endpoint to start attack
      fetch('/main/attack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: target, attackType: attackType }),
      })
        .then(response => response.json())
        .then(data => {
          updateStatistics(data);
        })
        .catch(error => {
          statusDisplay.textContent = `Error: ${error}`;
          clearInterval(intervalId);
        });

      mbpsDisplay.textContent = `MBPS: ${Math.random().toFixed(2)}`; // Mock MBPS data
      packetsSentDisplay.textContent = `Packets Sent: ${packetsSent++}`;
    }, 1000); // Update every 1 second

    // Stop the attack after a certain duration (e.g., 60 seconds)
    setTimeout(() => {
      clearInterval(intervalId);
      statusDisplay.textContent = 'Attack stopped.';
    }, 60000);
  });

  // Tab functionality
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to the clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Set the first tab as active by default
  if (tabs.length > 0) {
    tabs[0].classList.add('active');
    document.getElementById(tabs[0].getAttribute('data-tab')).classList.add('active');
  }
});