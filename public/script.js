document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  function updateStats(data) {
    mbpsDisplay.textContent = data.mbps;
    packetsSentDisplay.textContent = data.packetsSent;
    connectionStatusDisplay.textContent = data.status;
    timeElapsedDisplay.textContent = data.timeElapsed;
  }

  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    try {
      const response = await fetch(`/main/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: target, attackType: attackType })
      });

      if (response.ok) {
        const reader = response.body.getReader();
        let partialData = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          partialData += new TextDecoder().decode(value);

          let completeLines = partialData.split('\n');
          partialData = completeLines.pop();

          for (const line of completeLines) {
            try {
              const data = JSON.parse(line);
              updateStats(data);
            } catch (error) {
              console.error('Error parsing JSON:', error, 'Line:', line);
            }
          }
        }
      } else {
        console.error('Attack initiation failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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