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

  function updateStats(data) {
    mbpsDisplay.textContent = data.mbps || 'N/A';
    packetsSentDisplay.textContent = data.packetsSent || 'N/A';
    connectionStatusDisplay.textContent = data.status || 'N/A';
    timeElapsedDisplay.textContent = data.timeElapsed || 'N/A';
  }

  async function executeAttack(target, type) {
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
      let partialData = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        partialData += new TextDecoder().decode(value);

        try {
          const fullJson = JSON.parse(partialData);
          updateStats(fullJson);
          partialData = '';
        } catch (e) {
          if (!(e instanceof SyntaxError)) {
            console.error("Error parsing JSON:", e);
          }
        }
      }

    } catch (error) {
      console.error('Attack execution failed:', error);
      connectionStatusDisplay.textContent = 'Error';
    }
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const type = attackTypeSelect.value;
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