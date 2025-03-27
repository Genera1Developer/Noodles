// public/script.js

// Function to handle form submission for DDoS attack
document.getElementById('ddos-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const targetUrl = document.getElementById('target-url').value;
    const attackType = document.getElementById('attack-type').value;
    const numSockets = document.getElementById('num-sockets').value || 200; // Default value

    // Basic validation
    if (!targetUrl) {
        alert('Please enter a target URL.');
        return;
    }

    // Send data to the server using Fetch API
    fetch('main/ddos/attack', { // Corrected path
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            target: targetUrl,
            attackType: attackType,
            numSockets: numSockets
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Attack initiated successfully!');
            startStatsUpdate(targetUrl); // Start updating stats after successful initiation
        } else {
            alert('Attack failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while initiating the attack.');
    });
});

// Function to start updating statistics
function startStatsUpdate(targetUrl) {
    // Use setInterval to update stats regularly (e.g., every 5 seconds)
    setInterval(() => {
        updateStats(targetUrl);
    }, 5000);
}

// Function to update statistics
function updateStats(targetUrl) {
    fetch(`main/ddos/stats?target=${encodeURIComponent(targetUrl)}`) // Corrected path and added URL encoding
    .then(response => response.json())
    .then(data => {
        document.getElementById('mbps').textContent = data.mbps || 'N/A';
        document.getElementById('packets').textContent = data.packets || 'N/A';
        document.getElementById('status').textContent = data.status || 'N/A';
        document.getElementById('time').textContent = data.time || 'N/A';
    })
    .catch(error => {
        console.error('Error fetching stats:', error);
    });
}

// Tab switching logic
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show the selected tab content
        document.getElementById(tabId).classList.add('active');

        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to the clicked button
        this.classList.add('active');
    });
});

// Initial active tab (e.g., DDoS)
document.getElementById('ddos-tab-button').classList.add('active');
document.getElementById('ddos').classList.add('active');

// About Us page functionality
document.addEventListener('DOMContentLoaded', function() {
    const aboutUsButton = document.getElementById('about-us-tab-button');
    const aboutUsContent = document.getElementById('about-us');

    if (aboutUsButton && aboutUsContent) {
        aboutUsButton.addEventListener('click', function() {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show the About Us content
            aboutUsContent.classList.add('active');

            // Remove active class from all buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to the About Us button
            aboutUsButton.classList.add('active');
        });
    }
});