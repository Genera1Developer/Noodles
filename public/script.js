document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const attackButton = document.getElementById('attackButton');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const connectionStatusDisplay = document.getElementById('connectionStatus');
    const elapsedTimeDisplay = document.getElementById('elapsedTime');
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    let attackStartTime;
    let attackInterval;

    function updateStatistics(mbps, packetsSent, status) {
        mbpsDisplay.textContent = mbps;
        packetsSentDisplay.textContent = packetsSent;
        connectionStatusDisplay.textContent = status;
    }

    function updateElapsedTime() {
        const now = Date.now();
        const timeElapsed = now - attackStartTime;
        const seconds = Math.floor(timeElapsed / 1000);
        elapsedTimeDisplay.textContent = seconds;
    }

    attackButton.addEventListener('click', async () => {
        const target = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (!target) {
            alert('Please enter a target URL.');
            return;
        }

        attackButton.disabled = true;
        attackStartTime = Date.now();
        attackInterval = setInterval(updateElapsedTime, 1000);

        try {
            const response = await fetch(`/main/api/attack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    target: target,
                    attackType: attackType
                })
            });

            if (response.ok) {
                startStatsUpdates();
                console.log('Attack initiated successfully.');
            } else {
                console.error('Failed to initiate attack:', response.status);
                alert('Failed to initiate attack. Check console for details.');
            }
        } catch (error) {
            console.error('Error initiating attack:', error);
            alert('Error initiating attack. Check console for details.');
        } finally {
            attackButton.disabled = false;
        }
    });

    function startStatsUpdates() {
        attackInterval = setInterval(async () => {
            try {
                const response = await fetch('/main/api/stats');
                if (response.ok) {
                    const data = await response.json();
                    updateStatistics(data.mbps, data.packetsSent, data.status);
                } else {
                    console.error('Failed to fetch stats:', response.status);
                    updateStatistics('N/A', 'N/A', 'Error');
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
                updateStatistics('N/A', 'N/A', 'Error');
            }
        }, 1000);
    }

    function stopStatsUpdates() {
        clearInterval(attackInterval);
    }

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