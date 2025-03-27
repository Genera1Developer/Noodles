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

    let attackStartTime;
    let attackInterval;

    function updateStats(mbps, packets, status) {
        mbpsDisplay.textContent = mbps;
        packetsSentDisplay.textContent = packets;
        connectionStatusDisplay.textContent = status;
    }

    function updateElapsedTime() {
        const now = Date.now();
        const elapsedSeconds = (now - attackStartTime) / 1000;
        timeElapsedDisplay.textContent = elapsedSeconds.toFixed(2);
    }

    attackButton.addEventListener('click', async () => {
        const target = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (!target) {
            alert('Please enter a target URL.');
            return;
        }

        attackButton.disabled = true;
        attackButton.textContent = 'Attacking...';
        attackStartTime = Date.now();
        attackInterval = setInterval(updateElapsedTime, 100);

        try {
            const response = await fetch(`/main/attack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ target: target, attackType: attackType })
            });

            if (response.ok) {
                console.log('Attack initiated successfully');
                updateStats('N/A', 'N/A', 'Attacking');

                // Simulate receiving updates (replace with actual updates from the server)
                let packetsSent = 0;
                const updateInterval = setInterval(() => {
                    packetsSent += 500;
                    updateStats('150', packetsSent, 'Online');
                }, 2000);

                // Stop the attack and updates after a certain duration (e.g., 60 seconds)
                setTimeout(() => {
                    clearInterval(updateInterval);
                    clearInterval(attackInterval);
                    attackButton.disabled = false;
                    attackButton.textContent = 'Start Attack';
                    updateStats('N/A', packetsSent, 'Offline');
                }, 60000); // 60 seconds
            } else {
                console.error('Failed to initiate attack:', response.statusText);
                updateStats('N/A', 'N/A', 'Failed');
                clearInterval(attackInterval);
                attackButton.disabled = false;
                attackButton.textContent = 'Start Attack';
            }
        } catch (error) {
            console.error('Error initiating attack:', error);
            updateStats('N/A', 'N/A', 'Error');
            clearInterval(attackInterval);
            attackButton.disabled = false;
            attackButton.textContent = 'Start Attack';
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