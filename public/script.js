// script.js

// Function to handle form submission and initiate the attack
async function initiateAttack(target, attackType, duration, intensity) {
    try {
        const response = await fetch(`/main/attack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target, attackType, duration, intensity })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Attack initiated:', data);
        // Handle the response data as needed (e.g., update UI)
    } catch (error) {
        console.error('Failed to initiate attack:', error);
        // Handle errors in the UI
    }
}

// Function to fetch and display statistics
async function fetchAndDisplayStats() {
    try {
        const response = await fetch('/main/stats');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stats = await response.json();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Failed to fetch stats:', error);
    }
}

// Function to update the statistics display in the UI
function updateStatsDisplay(stats) {
    document.getElementById('mbps').textContent = stats.mbps ? stats.mbps.toFixed(2) : '0.00';
    document.getElementById('packetsSent').textContent = stats.packetsSent || '0';
    document.getElementById('targetStatus').textContent = stats.targetStatus || 'Unknown';
    document.getElementById('attackDuration').textContent = stats.attackDuration || '0';
}

// Event listener for the attack form submission
document.getElementById('attackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const target = document.getElementById('target').value;
    const attackType = document.getElementById('attackType').value;
    const duration = parseInt(document.getElementById('duration').value, 10);
    const intensity = parseInt(document.getElementById('intensity').value, 10);

    initiateAttack(target, attackType, duration, intensity);

    // Start fetching stats immediately after attack initiation
    setInterval(fetchAndDisplayStats, 2000); // Fetch stats every 2 seconds
});

// Initial call to fetch stats when the page loads
fetchAndDisplayStats();

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and hide all content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and show the corresponding content
            const tabId = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Initially activate the first tab
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});