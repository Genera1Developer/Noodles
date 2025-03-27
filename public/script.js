document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  function updateStats(data) {
    mbpsDisplay.textContent = data.mbps || '0';
    packetsSentDisplay.textContent = data.packetsSent || '0';
    connectionStatusDisplay.textContent = data.connectionStatus || 'Unknown';
    timeElapsedDisplay.textContent = data.timeElapsed || '0';
  }

  async function performAttack(target, attackType) {
    try {
      const response = await fetch(`/main/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target, attackType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const textDecoder = new TextDecoder();
        const textChunk = textDecoder.decode(value);
        const lines = textChunk.split('\n');

        lines.forEach(line => {
          if (line) {
            try {
              const data = JSON.parse(line);
              updateStats(data);
            } catch (error) {
              console.error('Error parsing JSON:', error, line);
            }
          }
        });
      }

      console.log('Attack completed.');
    } catch (error) {
      console.error('Attack failed:', error);
      connectionStatusDisplay.textContent = 'Error';
    }
  }

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;
    performAttack(target, attackType);
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});