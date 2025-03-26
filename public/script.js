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
    let isAttacking = false;

    function logMessage(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logArea.appendChild(logEntry);
        logArea.scrollTop = logArea.scrollHeight;
    }

    async function performAttack(targetUrl, attackType) {
        if (isAttacking) return;
        isAttacking = true;

        try {
            statusIndicator.textContent = 'Attacking...';
            statusIndicator.className = 'status-attacking';

            attackInterval = setInterval(async () => {
                try {
                    const response = await fetch(`/attack?url=${targetUrl}&type=${attackType}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ target: targetUrl, attack: attackType })
                    });

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
                } catch (error) {
                    logMessage(`Attack error: ${error.message}`);
                    stopAttack();
                }
            }, 10);
        } catch (error) {
            logMessage(`Attack initiation error: ${error.message}`);
            stopAttack();
        }
    }

    function stopAttack() {
        clearInterval(attackInterval);
        isAttacking = false;
        attackButton.textContent = 'Start Attack';
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

        if (isAttacking) {
            stopAttack();
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

    async function performAction(endpoint, targetUrl, actionName) {
        if (!targetUrl) {
            logMessage(`Please enter a target URL for ${actionName}.`);
            return;
        }
        logMessage(`Attempting to ${actionName} ${targetUrl}...`);
        try {
            const response = await fetch(`/${endpoint}?url=${targetUrl}`, { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                logMessage(`${actionName} initiated. Status: ${data.status}`);
            } else {
                logMessage(`${actionName} failed: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            logMessage(`${actionName} error: ${error.message}`);
        }
    }

    document.getElementById('defaceButton').addEventListener('click', async () => {
        const targetUrl = document.getElementById('targetUrl').value;
        await performAction('deface', targetUrl, 'Defacement');
    });

    document.getElementById('connectButton').addEventListener('click', async () => {
        const targetUrl = document.getElementById('targetUrl').value;
        await performAction('connect', targetUrl, 'Connection');
    });

    document.getElementById('ransomwareButton').addEventListener('click', async () => {
        const targetUrl = document.getElementById('targetUrl').value;
        await performAction('ransomware', targetUrl, 'Ransomware');
    });
});