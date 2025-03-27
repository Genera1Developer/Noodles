// script.js

// Function to handle form submission and trigger attack
async function startAttack(target, attackType, intensity) {
    const attackEndpoint = `/main/attack`; // Correct endpoint

    try {
        const response = await fetch(attackEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target, attackType, intensity })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Attack started:', data);

        // Update UI with attack status and statistics (placeholder)
        updateUI('Attack in progress...');
    } catch (error) {
        console.error('Error starting attack:', error);
        updateUI('Error starting attack: ' + error.message);
    }
}

// Function to update UI elements with attack status and statistics
function updateUI(message) {
    document.getElementById('attackStatus').innerText = message;
    // Add other UI updates for MBPS, packets, target status, and time elapsed
}

// Event listener for the attack form submission
document.getElementById('attackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const target = document.getElementById('targetUrl').value;
    const attackType = document.getElementById('attackType').value;
    const intensity = document.getElementById('intensity').value;

    // Validate inputs
    if (!target) {
        alert('Please enter a target URL.');
        return;
    }

    startAttack(target, attackType, intensity);
});

// Navigation tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate the clicked tab and corresponding content
            const tabId = tab.getAttribute('data-tab');
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Set the first tab as active by default
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        document.getElementById(tabs[0].getAttribute('data-tab')).classList.add('active');
    }
});

// Placeholder function for About Us content loading (can be expanded)
function loadAboutUs() {
    document.getElementById('aboutUsContent').innerText = 'About Noodles: This application is designed for security testing purposes. Use responsibly.';
}

// Call loadAboutUs when the About Us tab is clicked (if needed)
document.getElementById('aboutUsTab').addEventListener('click', loadAboutUs);
function updateStats(mbps, packets, status, time) {
    document.getElementById('mbps').innerText = mbps;
    document.getElementById('packets').innerText = packets;
    document.getElementById('status').innerText = status;
    document.getElementById('time').innerText = time;
}