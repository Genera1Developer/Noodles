document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const attackButton = document.getElementById('attackButton');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const connectionStatusDisplay = document.getElementById('connectionStatus');
    const timeElapsedDisplay = document.getElementById('timeElapsed');
    const tabs = document.querySelectorAll('.tab-button');
    const tabContent = document.querySelectorAll('.tab-content');

    // Function to handle tab switching
    function openTab(tabName) {
        tabContent.forEach(content => {
            content.style.display = 'none';
        });
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabName).style.display = 'block';
        event.target.classList.add('active');
    }

    // Attach click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            openTab(event.target.dataset.tab);
        });
    });

    // Show the first tab by default
    openTab('DDoS');

    attackButton.addEventListener('click', async () => {
        const targetUrl = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (!targetUrl) {
            alert('Please enter a target URL.');
            return;
        }

        let startTime;

        async function updateStats() {
            try {
                const response = await fetch('/main/api/stats');
                const data = await response.json();

                mbpsDisplay.textContent = data.mbps;
                packetsSentDisplay.textContent = data.packetsSent;
                connectionStatusDisplay.textContent = data.connectionStatus;

                const now = Date.now();
                const elapsedSeconds = (now - startTime) / 1000;
                timeElapsedDisplay.textContent = elapsedSeconds.toFixed(2);

            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }

        try {
            const response = await fetch('/main/api/attack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    target: targetUrl,
                    type: attackType
                })
            });

            if (response.ok) {
                startTime = Date.now();
                setInterval(updateStats, 1000);
                alert('Attack started successfully!');
            } else {
                const errorData = await response.json();
                alert(`Attack failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error starting attack:', error);
            alert('Failed to start attack. Check console for details.');
        }
    });
});