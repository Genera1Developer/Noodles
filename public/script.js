// script.js

// Function to handle form submission and attack execution
async function executeAttack(target, attackType) {
    const statusDisplay = document.getElementById('statusDisplay');
    statusDisplay.innerText = 'Initiating attack...';

    try {
        const response = await fetch('/main/attack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target: target, attackType: attackType })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        statusDisplay.innerText = `Attack Result: ${data.message}`;
        // Implement real-time stats updates here based on the response.
        updateStats(data.stats);

    } catch (error) {
        console.error('Attack execution failed:', error);
        statusDisplay.innerText = `Attack Failed: ${error.message}`;
    }
}

// Function to update statistics display
function updateStats(stats) {
    document.getElementById('mbps').innerText = stats.mbps || 'N/A';
    document.getElementById('packets').innerText = stats.packets || 'N/A';
    document.getElementById('targetStatus').innerText = stats.targetStatus || 'N/A';
    document.getElementById('elapsedTime').innerText = stats.elapsedTime || 'N/A';
}

// Event listener for the attack button
document.addEventListener('DOMContentLoaded', () => {
    const attackButton = document.getElementById('attackButton');
    if (attackButton) {
        attackButton.addEventListener('click', () => {
            const target = document.getElementById('target').value;
            const attackType = document.getElementById('attackType').value;
            executeAttack(target, attackType);
        });
    } else {
        console.error('Attack button not found');
    }

    //Navigation buttons functionality
    document.getElementById('ddosButton').addEventListener('click', () => showTab('ddos'));
    document.getElementById('defacementButton').addEventListener('click', () => showTab('defacement'));
    document.getElementById('connectionButton').addEventListener('click', () => showTab('connection'));
    document.getElementById('credentialButton').addEventListener('click', () => showTab('credential'));
    document.getElementById('aboutUsButton').addEventListener('click', () => showTab('aboutUs'));
});


function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabId + 'Tab').style.display = 'block';
}