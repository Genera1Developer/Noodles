document.addEventListener('DOMContentLoaded', () => {
    const attackButton = document.getElementById('attackButton');
    const targetUrlInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const statusIndicator = document.getElementById('statusIndicator');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const mbpsDisplay = document.getElementById('mbps');
    const logArea = document.getElementById('logArea');

    let packetsSent = 0;
    let mbps = 0;
    let attackInterval;

    function logMessage(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logArea.appendChild(logEntry);
        logArea.scrollTop = logArea.scrollHeight;
    }

    async function performAttack(targetUrl, attackType) {
        try {
            statusIndicator.textContent = 'Attacking...';
            statusIndicator.className = 'status-attacking';

            attackInterval = setInterval(async () => {
                const response = await fetch(`/attack?url=${targetUrl}&type=${attackType}`);

                if (response.ok) {
                    packetsSent++;
                    packetsSentDisplay.textContent = packetsSent;

                    const bandwidth = Math.random() * 10;
                    mbps += bandwidth;
                    mbpsDisplay.textContent = mbps.toFixed(2);

                    logMessage(`Attack packet sent to ${targetUrl} (${attackType}) - ${bandwidth.toFixed(2)} Mbps`);
                } else {
                    logMessage(`Attack failed: ${response.status} ${response.statusText}`);
                    stopAttack();
                }
            }, 10);
        } catch (error) {
            logMessage(`Attack error: ${error.message}`);
            stopAttack();
        }
    }

    function stopAttack() {
        clearInterval(attackInterval);
        statusIndicator.textContent = 'Idle';
        statusIndicator.className = 'status-idle';
        logMessage('Attack stopped.');
    }

    attackButton.addEventListener('click', async () => {
        const targetUrl = targetUrlInput.value;
        const attackType = attackTypeSelect.value;

        if (!targetUrl) {
            logMessage('Please enter a target URL.');
            return;
        }

        if (statusIndicator.textContent === 'Attacking...') {
            stopAttack();
            attackButton.textContent = 'Start Attack';
        } else {
            packetsSent = 0;
            mbps = 0;
            packetsSentDisplay.textContent = '0';
            mbpsDisplay.textContent = '0.00';
            logArea.innerHTML = ''; 

            attackButton.textContent = 'Stop Attack';
            performAttack(targetUrl, attackType);
        }
    });

    document.getElementById('defaceButton').addEventListener('click', async () => {
        const targetUrl = document.getElementById('targetUrl').value;
        if (!targetUrl) {
            logMessage('Please enter a target URL for defacement.');
            return;
        }
        logMessage(`Attempting to deface ${targetUrl}...`);
        try {
            const response = await fetch(`/deface?url=${targetUrl}`, { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                logMessage(`Defacement initiated. Status: ${data.status}`);
            } else {
                logMessage(`Defacement failed: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            logMessage(`Defacement error: ${error.message}`);
        }
    });

    document.getElementById('connectButton').addEventListener('click', async () => {
         const targetUrl = document.getElementById('targetUrl').value;
         if (!targetUrl) {
             logMessage('Please enter a target URL for connection.');
             return;
         }
         logMessage(`Attempting to connect to ${targetUrl}...`);
         try {
             const response = await fetch(`/connect?url=${targetUrl}`, { method: 'POST' });
             if (response.ok) {
                 const data = await response.json();
                 logMessage(`Connection initiated. Status: ${data.status}`);
             } else {
                 logMessage(`Connection failed: ${response.status} ${response.statusText}`);
             }
         } catch (error) {
             logMessage(`Connection error: ${error.message}`);
         }
     });


     document.getElementById('ransomwareButton').addEventListener('click', async () => {
        const targetUrl = document.getElementById('targetUrl').value;
        if (!targetUrl) {
            logMessage('Please enter a target URL for ransomware.');
            return;
        }
        logMessage(`Initiating ransomware attack on ${targetUrl}...`);
        try {
            const response = await fetch(`/ransomware?url=${targetUrl}`, { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                logMessage(`Ransomware deployed. Status: ${data.status}`);
            } else {
                logMessage(`Ransomware deployment failed: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            logMessage(`Ransomware error: ${error.message}`);
        }
    });
});