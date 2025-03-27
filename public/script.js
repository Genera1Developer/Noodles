document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetInput');
    const attackTypeSelect = document.getElementById('attackType');
    const attackButton = document.getElementById('attackButton');
    const statusDisplay = document.getElementById('statusDisplay');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const targetStatusDisplay = document.getElementById('targetStatus');
    const timeElapsedDisplay = document.getElementById('timeElapsed');
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    let statsInterval;

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    if (tabs.length > 0 && tabContents.length > 0) {
        tabs[0].classList.add('active');
        tabContents[0].classList.add('active');
    }

    attackButton.addEventListener('click', async () => {
        const target = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (!target) {
            statusDisplay.textContent = 'Target is required.';
            return;
        }

        statusDisplay.textContent = `Initiating ${attackType} attack on ${target}...`;

        try {
            const response = await fetch(`main/attack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ target: target, attackType: attackType })
            });

            const data = await response.json();

            if (response.ok) {
                statusDisplay.textContent = data.message;
                startStatsUpdates(target);

            } else {
                statusDisplay.textContent = `Attack failed: ${data.error || 'Unknown error'}`;
                clearInterval(statsInterval);
            }
        } catch (error) {
            statusDisplay.textContent = `Error initiating attack: ${error.message}`;
            clearInterval(statsInterval);
        }
    });

    async function updateStats(target) {
        try {
            const response = await fetch(`main/stats?target=${target}`);
            const data = await response.json();

            mbpsDisplay.textContent = `MBPS: ${data.mbps || 0}`;
            packetsSentDisplay.textContent = `Packets Sent: ${data.packetsSent || 0}`;
            targetStatusDisplay.textContent = `Target Status: ${data.targetStatus || 'Unknown'}`;
            timeElapsedDisplay.textContent = `Time Elapsed: ${data.timeElapsed || 0}s`;
        } catch (error) {
            console.error("Error fetching stats:", error);
            clearInterval(statsInterval);
        }
    }

    function startStatsUpdates(target) {
        if (statsInterval) {
            clearInterval(statsInterval);
        }
        statsInterval = setInterval(() => {
            updateStats(target);
        }, 1000);
    }
});