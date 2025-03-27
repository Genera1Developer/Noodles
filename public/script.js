document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const attackButton = document.getElementById('attackButton');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const connectionStatusDisplay = document.getElementById('connectionStatus');
    const elapsedTimeDisplay = document.getElementById('elapsedTime');

    let attackStartTime;
    let attackInterval;

    attackButton.addEventListener('click', () => {
        const targetUrl = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (!targetUrl) {
            alert('Please enter a target URL.');
            return;
        }

        startAttack(targetUrl, attackType);
    });

    async function startAttack(targetUrl, attackType) {
        attackButton.disabled = true;
        attackStartTime = new Date();
        updateStatistics();

        try {
            const response = await fetch(`/main/attack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ targetUrl: targetUrl, attackType: attackType })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            attackInterval = setInterval(updateStatistics, 1000);

        } catch (error) {
            console.error('Attack initiation error:', error);
            alert('Attack initiation failed. Check console for details.');
            attackButton.disabled = false;
            clearInterval(attackInterval);
        }
    }

    function updateStatistics() {
        const now = new Date();
        const elapsedTime = Math.floor((now - attackStartTime) / 1000);

        mbpsDisplay.textContent = 'Calculating...';
        packetsSentDisplay.textContent = 'Calculating...';
        connectionStatusDisplay.textContent = 'Checking...';
        elapsedTimeDisplay.textContent = `${elapsedTime} seconds`;

        fetch('/main/stats')
            .then(response => response.json())
            .then(data => {
                mbpsDisplay.textContent = data.mbps ? `${data.mbps} MBPS` : 'N/A';
                packetsSentDisplay.textContent = data.packetsSent ? `${data.packetsSent} packets` : 'N/A';
                connectionStatusDisplay.textContent = data.status || 'Unknown';
            })
            .catch(error => {
                console.error('Error fetching statistics:', error);
                mbpsDisplay.textContent = 'Error';
                packetsSentDisplay.textContent = 'Error';
                connectionStatusDisplay.textContent = 'Error';
            });
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const target = button.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });
});