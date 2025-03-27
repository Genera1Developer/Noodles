document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetUrl');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const elapsedTimeDisplay = document.getElementById('elapsedTime');

  attackButton.addEventListener('click', async () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;

    if (!target) {
      alert('Please enter a target URL or .onion address.');
      return;
    }

    let startTime;

    try {
      const response = await fetch(`/main/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: target, attackType: attackType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      let decoder = new TextDecoder();

      startTime = Date.now();
      let packetsSent = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const message = decoder.decode(value);
        console.log("Received data:", message);

        // Process real-time updates
        if (message.includes("MBPS:")) {
          mbpsDisplay.textContent = message.split("MBPS:")[1].trim();
        } else if (message.includes("Packets:")) {
          packetsSent = parseInt(message.split("Packets:")[1].trim(), 10);
          packetsSentDisplay.textContent = packetsSent;
        } else if (message.includes("Status:")) {
          connectionStatusDisplay.textContent = message.split("Status:")[1].trim();
        }

        const elapsedTime = (Date.now() - startTime) / 1000;
        elapsedTimeDisplay.textContent = elapsedTime.toFixed(2);

        //Update other statistics
        mbpsDisplay.textContent = (Math.random() * 100).toFixed(2);
        packetsSentDisplay.textContent = packetsSent;
        connectionStatusDisplay.textContent = "Online";
        elapsedTimeDisplay.textContent = elapsedTime.toFixed(2);
      }

      console.log('Attack completed.');
    } catch (error) {
      console.error('Error during attack:', error);
      alert(`Attack failed: ${error.message}`);
    }
  });

  // Side Panel Navigation
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const tab = event.target.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });
      document.getElementById(tab).style.display = 'block';
    });
  });
});