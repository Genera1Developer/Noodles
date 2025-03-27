// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const attackButton = document.getElementById('attackButton');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const connectionStatusDisplay = document.getElementById('connectionStatus');
    const timeElapsedDisplay = document.getElementById('timeElapsed');

    attackButton.addEventListener('click', () => {
        const target = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (!target) {
            alert('Please enter a target URL.');
            return;
        }

        startAttack(target, attackType);
    });

    async function startAttack(target, attackType) {
        try {
            const response = await fetch(`/main/attack`, {
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
            let partialData = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                partialData += new TextDecoder().decode(value);
                const lines = partialData.split('\n');

                for (let i = 0; i < lines.length - 1; i++) {
                    const line = lines[i];
                    try {
                        const data = JSON.parse(line);
                        updateUI(data);
                    } catch (e) {
                        console.error('Invalid JSON:', line);
                    }
                }
                partialData = lines[lines.length - 1];
            }

        } catch (error) {
            console.error('Error starting attack:', error);
            alert(`Attack failed: ${error.message}`);
        }
    }

    function updateUI(data) {
        if (data.mbps) {
            mbpsDisplay.textContent = data.mbps;
        }
        if (data.packetsSent) {
            packetsSentDisplay.textContent = data.packetsSent;
        }
        if (data.connectionStatus) {
            connectionStatusDisplay.textContent = data.connectionStatus;
        }
        if (data.timeElapsed) {
            timeElapsedDisplay.textContent = data.timeElapsed;
        }
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and hide all content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and show its content
            const tabId = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Set the first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    // Link to all frontend HTML files
    console.log('script.js loaded and linked to all frontend HTML files.');
});