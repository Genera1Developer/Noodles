// script.js

// Function to handle form submission for initiating attacks
async function initiateAttack(attackType, targetUrl, duration, threads) {
    const statusDiv = document.getElementById('attackStatus');
    statusDiv.innerHTML = `<p>Initiating ${attackType} attack on ${targetUrl}...</p>`;

    try {
        const response = await fetch(`/main/attackHandler.js?attackType=${attackType}&targetUrl=${targetUrl}&duration=${duration}&threads=${threads}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        statusDiv.innerHTML = `<p>${result.message}</p>`;

    } catch (error) {
        console.error('Error initiating attack:', error);
        statusDiv.innerHTML = `<p>Error initiating attack: ${error.message}</p>`;
    }
}

// Function to update statistics display (Placeholder - Implement actual statistics fetching)
function updateStatistics() {
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const connectionStatusDisplay = document.getElementById('connectionStatus');
    const timeElapsedDisplay = document.getElementById('timeElapsed');

    // Placeholder values - Replace with actual data fetching from backend
    mbpsDisplay.textContent = '10.5';
    packetsSentDisplay.textContent = '12345';
    connectionStatusDisplay.textContent = 'Online';
    timeElapsedDisplay.textContent = '60';
}

// Add event listeners to attack buttons
document.addEventListener('DOMContentLoaded', () => {
    const attackForm = document.getElementById('attackForm');
    attackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const attackType = document.getElementById('attackType').value;
        const targetUrl = document.getElementById('targetUrl').value;
        const duration = document.getElementById('duration').value;
        const threads = document.getElementById('threads').value;

        initiateAttack(attackType, targetUrl, duration, threads);
    });

    // Setup interval for updating statistics (adjust interval as needed)
    setInterval(updateStatistics, 2000);
});