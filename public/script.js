document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackSelect = document.getElementById('attackSelect');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbpsDisplay');
  const packetsSentDisplay = document.getElementById('packetsSentDisplay');
  const connectionStatusDisplay = document.getElementById('connectionStatusDisplay');
  const elapsedTimeDisplay = document.getElementById('elapsedTimeDisplay');
  const sidePanel = document.querySelector('.side-panel');
  const navButtons = document.querySelectorAll('.nav-button');

  let attackRunning = false;
  let startTime;
  let packetsSent = 0;

  // Function to update statistics display
  function updateStats(data) {
    if (data.mbps) {
      mbpsDisplay.textContent = `MBPS: ${data.mbps.toFixed(2)}`;
    }
    if (data.packets) {
      packetsSent = data.packets;
      packetsSentDisplay.textContent = `Packets Sent: ${packetsSent}`;
    }
    if (data.status) {
      connectionStatusDisplay.textContent = `Status: ${data.status}`;
    }
    if (data.elapsedTime) {
      elapsedTimeDisplay.textContent = `Time: ${data.elapsedTime.toFixed(1)}s`;
    }
  }

  // Function to handle attack execution
  async function executeAttack(target, attackType) {
    attackRunning = true;
    startTime = Date.now();

    // Update UI to reflect attack is starting
    attackButton.disabled = true;
    attackButton.textContent = 'Attacking...';

    try {
      const response = await fetch(`/main/attackHandler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: target, attackType: attackType })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      let decoder = new TextDecoder();
      let partialData = '';

      while (attackRunning) {
        const { value, done } = await reader.read();
        if (done) {
          console.log('Attack stream complete.');
          break;
        }

        partialData += decoder.decode(value);
        let completeLines = partialData.split('\n');
        partialData = completeLines.pop(); // Store the partial line

        completeLines.forEach(line => {
          if (line) {
            try {
              const data = JSON.parse(line);
              updateStats(data);
            } catch (e) {
              console.error("Error parsing JSON:", e, "Line:", line);
            }
          }
        });

        // Check if attack duration has elapsed (example: 60 seconds)
        if ((Date.now() - startTime) / 1000 > 60) {
          console.log('Attack duration elapsed. Stopping attack.');
          stopAttack();
        }
      }
    } catch (error) {
      console.error('Attack execution failed:', error);
      updateStats({ status: 'Error: ' + error.message });
    } finally {
      attackButton.disabled = false;
      attackButton.textContent = 'Execute Attack';
      attackRunning = false;
    }
  }

  // Function to stop the attack
  function stopAttack() {
    attackRunning = false;
    fetch('/main/stopAttack', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          console.error('Failed to stop attack:', response.status);
        }
      })
      .catch(error => {
        console.error('Error stopping attack:', error);
      })
      .finally(() => {
        attackButton.disabled = false;
        attackButton.textContent = 'Execute Attack';
      });
  }


  // Attack button event listener
  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackSelect.value;

    if (!target) {
      alert('Please enter a target URL or IP address.');
      return;
    }

    executeAttack(target, attackType);
  });


  // Side panel navigation
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      button.classList.add('active');

      // Hide all sections
      document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
      });

      // Show the selected section
      const targetSectionId = button.getAttribute('data-target');
      document.getElementById(targetSectionId).style.display = 'block';
    });
  });

  // Initially activate the DDoS tab
  document.querySelector('.nav-button[data-target="ddos-content"]').classList.add('active');
  document.getElementById('ddos-content').style.display = 'block';

});
content:
document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetInput');
    const attackSelect = document.getElementById('attackSelect');
    const attackButton = document.getElementById('attackButton');
    const mbpsDisplay = document.getElementById('mbpsDisplay');
    const packetsSentDisplay = document.getElementById('packetsSentDisplay');
    const connectionStatusDisplay = document.getElementById('connectionStatusDisplay');
    const elapsedTimeDisplay = document.getElementById('elapsedTimeDisplay');
    const sidePanel = document.querySelector('.side-panel');
    const navButtons = document.querySelectorAll('.nav-button');

    let attackRunning = false;
    let startTime;
    let packetsSent = 0;

    // Function to update statistics display
    function updateStats(data) {
        if (data.mbps) {
            mbpsDisplay.textContent = `MBPS: ${data.mbps.toFixed(2)}`;
        }
        if (data.packets) {
            packetsSent = data.packets;
            packetsSentDisplay.textContent = `Packets Sent: ${packetsSent}`;
        }
        if (data.status) {
            connectionStatusDisplay.textContent = `Status: ${data.status}`;
        }
        if (data.elapsedTime) {
            elapsedTimeDisplay.textContent = `Time: ${data.elapsedTime.toFixed(1)}s`;
        }
    }

    // Function to handle attack execution
    async function executeAttack(target, attackType) {
        attackRunning = true;
        startTime = Date.now();

        // Update UI to reflect attack is starting
        attackButton.disabled = true;
        attackButton.textContent = 'Attacking...';

        try {
            const response = await fetch(`/main/attackHandler`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ target: target, attackType: attackType })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            let decoder = new TextDecoder();
            let partialData = '';

            while (attackRunning) {
                const { value, done } = await reader.read();
                if (done) {
                    console.log('Attack stream complete.');
                    break;
                }

                partialData += decoder.decode(value);
                let completeLines = partialData.split('\n');
                partialData = completeLines.pop(); // Store the partial line

                completeLines.forEach(line => {
                    if (line) {
                        try {
                            const data = JSON.parse(line);
                            updateStats(data);
                        } catch (e) {
                            console.error("Error parsing JSON:", e, "Line:", line);
                        }
                    }
                });

                // Check if attack duration has elapsed (example: 60 seconds)
                if ((Date.now() - startTime) / 1000 > 60) {
                    console.log('Attack duration elapsed. Stopping attack.');
                    stopAttack();
                }
            }
        } catch (error) {
            console.error('Attack execution failed:', error);
            updateStats({ status: 'Error: ' + error.message });
        } finally {
            attackButton.disabled = false;
            attackButton.textContent = 'Execute Attack';
            attackRunning = false;
        }
    }

    // Function to stop the attack
    function stopAttack() {
        attackRunning = false;
        fetch('/main/stopAttack', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to stop attack:', response.status);
                }
            })
            .catch(error => {
                console.error('Error stopping attack:', error);
            })
            .finally(() => {
                attackButton.disabled = false;
                attackButton.textContent = 'Execute Attack';
            });
    }


    // Attack button event listener
    attackButton.addEventListener('click', () => {
        const target = targetInput.value;
        const attackType = attackSelect.value;

        if (!target) {
            alert('Please enter a target URL or IP address.');
            return;
        }

        executeAttack(target, attackType);
    });


    // Side panel navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });

            // Show the selected section
            const targetSectionId = button.getAttribute('data-target');
            document.getElementById(targetSectionId).style.display = 'block';
        });
    });

    // Initially activate the DDoS tab
    document.querySelector('.nav-button[data-target="ddos-content"]').classList.add('active');
    document.getElementById('ddos-content').style.display = 'block';

});