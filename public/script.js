document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  let attackRunning = false; // Flag to prevent multiple attacks

  function updateStats(data) {
    mbpsDisplay.textContent = data.mbps !== undefined ? data.mbps : 'N/A';
    packetsSentDisplay.textContent = data.packetsSent !== undefined ? data.packetsSent : 'N/A';
    connectionStatusDisplay.textContent = data.status || 'Idle';
    timeElapsedDisplay.textContent = data.timeElapsed !== undefined ? data.timeElapsed : 'N/A';
  }

  async function executeAttack(target, type) {
    if (attackRunning) {
      console.warn("Attack already in progress.");
      return;
    }

    attackRunning = true;
    attackButton.disabled = true; // Disable the button during the attack
    connectionStatusDisplay.textContent = 'Connecting...'; // Initial status

    try {
      const response = await fetch(`/main/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target, type })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value);

        // Process the buffer, looking for complete JSON objects
        let boundary = buffer.indexOf('\n'); // Assuming newline separation
        while (boundary !== -1) {
            const jsonString = buffer.substring(0, boundary);
            buffer = buffer.substring(boundary + 1);

            try {
                const data = JSON.parse(jsonString);
                updateStats(data);
            } catch (e) {
                console.error("Error parsing JSON:", e, "String:", jsonString);
            }
            boundary = buffer.indexOf('\n');
        }
      }


      connectionStatusDisplay.textContent = 'Completed';

    } catch (error) {
      console.error('Attack execution failed:', error);
      connectionStatusDisplay.textContent = 'Error';
    } finally {
      attackRunning = false;
      attackButton.disabled = false; // Re-enable the button
    }
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const type = attackTypeSelect.value;

    if (!target) {
      alert("Please enter a target URL.");
      return;
    }

    executeAttack(target, type);
  });

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});