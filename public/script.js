// public/script.js

// Function to handle form submission and trigger the Slowloris attack
async function handleSlowlorisAttack(targetUrl, numSockets) {
    try {
        // Validate inputs (add more validation as needed)
        if (!targetUrl) {
            alert("Please enter a target URL.");
            return;
        }

        if (!numSockets || isNaN(numSockets) || numSockets <= 0) {
            numSockets = 200; // Default value
        } else {
            numSockets = parseInt(numSockets);
        }

        // Construct the API endpoint URL using relative path
        const apiUrl = 'main/ddos/slowloris.php';

        // Make a POST request to trigger the attack
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target: targetUrl, numSockets: numSockets })
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.message) {
                alert(data.message); // Display success or any message from the backend
            } else {
                alert("Attack initiated successfully (no message from server).");
            }

             // Start updating statistics (example)
            startUpdatingStats(targetUrl);

        } else {
            const errorData = await response.json();
            if (errorData && errorData.error) {
              alert(`Attack failed: ${errorData.error}`);
            } else {
              alert("Attack failed: Unknown error.");
            }
        }
    } catch (error) {
        console.error("Error during attack:", error);
        alert("An unexpected error occurred: " + error.message);
    }
}

// Function to update statistics in real-time (example implementation)
async function updateStats(targetUrl) {
  // Placeholder for fetching and updating statistics. Replace with actual implementation
  // that fetches data from the server and updates the corresponding HTML elements.
  // This is just a simulation for demonstration.

  const mbpsElement = document.getElementById('mbps');
  const packetsSentElement = document.getElementById('packetsSent');
  const connectionStatusElement = document.getElementById('connectionStatus');
  const elapsedTimeElement = document.getElementById('elapsedTime');

  // Simulate data fetching (replace with actual API calls)
  const simulatedMbps = Math.random() * 10; // Example: 0-10 MBPS
  const simulatedPacketsSent = Math.floor(Math.random() * 1000); // Example: 0-1000 packets
  const simulatedStatus = Math.random() > 0.5 ? 'Online' : 'Offline'; // Example: Online/Offline
  const simulatedElapsedTime = Math.floor(Math.random() * 60); // Example: 0-60 seconds

  if (mbpsElement) mbpsElement.textContent = simulatedMbps.toFixed(2);
  if (packetsSentElement) packetsSentElement.textContent = simulatedPacketsSent;
  if (connectionStatusElement) connectionStatusElement.textContent = simulatedStatus;
  if (elapsedTimeElement) elapsedTimeElement.textContent = simulatedElapsedTime;
}

// Function to start updating statistics periodically
function startUpdatingStats(targetUrl) {
  // Initial update
  updateStats(targetUrl);

  // Set interval to update statistics every few seconds (e.g., 3 seconds)
  setInterval(() => {
    updateStats(targetUrl);
  }, 3000);
}

// Add event listeners to your HTML elements (assuming you have corresponding elements)
document.addEventListener('DOMContentLoaded', () => {
    // Example: Button to trigger Slowloris
    const slowlorisButton = document.getElementById('slowlorisButton');
    if (slowlorisButton) {
        slowlorisButton.addEventListener('click', () => {
            const targetUrl = document.getElementById('targetUrl').value;
            const numSockets = document.getElementById('numSockets').value;
            handleSlowlorisAttack(targetUrl, numSockets);
        });
    }

    // Navigation tabs
    const ddosTab = document.getElementById('ddosTab');
    const defacementTab = document.getElementById('defacementTab');
    const connectionTab = document.getElementById('connectionTab');
    const credentialTab = document.getElementById('credentialTab');
    const aboutUsTab = document.getElementById('aboutUsTab');

    // Tab click handlers - show relevant content, hide others.
    if (ddosTab) {
        ddosTab.addEventListener('click', () => {
            showTabContent('ddosContent');
        });
    }
     if (defacementTab) {
        defacementTab.addEventListener('click', () => {
            showTabContent('defacementContent');
        });
    }
    if (connectionTab) {
        connectionTab.addEventListener('click', () => {
            showTabContent('connectionContent');
        });
    }
    if (credentialTab) {
        credentialTab.addEventListener('click', () => {
            showTabContent('credentialContent');
        });
    }
    if (aboutUsTab) {
        aboutUsTab.addEventListener('click', () => {
            showTabContent('aboutUsContent');
        });
    }

    // Function to show the selected tab's content and hide others
    function showTabContent(tabId) {
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.style.display = 'none';
        });

        const selectedTabContent = document.getElementById(tabId);
        if (selectedTabContent) {
            selectedTabContent.style.display = 'block';
        }
    }

    // Initial tab - show DDoS content by default
    showTabContent('ddosContent');
});