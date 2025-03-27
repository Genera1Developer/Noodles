// script.js

// Function to handle form submission for DDoS attack
async function handleDDoSAttack(event) {
    event.preventDefault();

    const targetUrl = document.getElementById('targetUrl').value;
    const attackType = document.getElementById('attackType').value;
    const duration = document.getElementById('duration').value;
    const intensity = document.getElementById('intensity').value;

    // Basic validation
    if (!targetUrl || !attackType || !duration || !intensity) {
        alert('Please fill in all fields.');
        return;
    }

    // Prepare data for the request
    const attackData = {
        target: targetUrl,
        attackType: attackType,
        duration: parseInt(duration),
        intensity: parseInt(intensity)
    };

    try {
        // Make a POST request to the appropriate endpoint
        const response = await fetch(`/main/attack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attackData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Attack initiated:', result);
            alert('Attack initiated successfully!');
        } else {
            console.error('Failed to initiate attack:', response.status);
            alert('Failed to initiate attack.');
        }
    } catch (error) {
        console.error('Error during attack initiation:', error);
        alert('Error initiating attack.');
    }

    // Update statistics display (simulated)
    updateStatistics(targetUrl);
}

// Function to simulate updating statistics (replace with actual data retrieval)
function updateStatistics(targetUrl) {
    const mbpsDisplay = document.getElementById('mbps');
    const packetsSentDisplay = document.getElementById('packetsSent');
    const connectionStatusDisplay = document.getElementById('connectionStatus');
    const timeElapsedDisplay = document.getElementById('timeElapsed');

    // Simulate real-time data (replace with actual data fetching logic)
    let mbps = Math.floor(Math.random() * 100);
    let packetsSent = Math.floor(Math.random() * 10000);
    let status = Math.random() > 0.5 ? 'Online' : 'Offline';
    let timeElapsed = Math.floor(Math.random() * 60);

    mbpsDisplay.textContent = `${mbps} MBPS`;
    packetsSentDisplay.textContent = `${packetsSent} Packets`;
    connectionStatusDisplay.textContent = `Status: ${status}`;
    timeElapsedDisplay.textContent = `${timeElapsed} Seconds`;
}

// Function to handle form submission for website defacement
async function handleDefacement(event) {
    event.preventDefault();

    const targetUrl = document.getElementById('defacementTargetUrl').value;
    const defacementText = document.getElementById('defacementText').value;
    const imageFile = document.getElementById('defacementImage').files[0];

    if (!targetUrl || !defacementText) {
        alert('Please provide the target URL and defacement text.');
        return;
    }

    const formData = new FormData();
    formData.append('targetUrl', targetUrl);
    formData.append('defacementText', defacementText);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch('/main/defacement', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Defacement initiated:', result);
            alert('Defacement initiated successfully!');
        } else {
            console.error('Failed to initiate defacement:', response.status);
            alert('Failed to initiate defacement.');
        }
    } catch (error) {
        console.error('Error during defacement initiation:', error);
        alert('Error initiating defacement.');
    }
}

// Function to handle form submission for establishing connections
async function handleConnection(event) {
    event.preventDefault();

    const connectionTargetUrl = document.getElementById('connectionTargetUrl').value;
    const connectionType = document.getElementById('connectionType').value; // e.g., SSH, Telnet

    if (!connectionTargetUrl || !connectionType) {
        alert('Please provide the target URL and connection type.');
        return;
    }

    const connectionData = {
        targetUrl: connectionTargetUrl,
        connectionType: connectionType
    };

    try {
        const response = await fetch('/main/connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(connectionData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Connection request sent:', result);
            alert('Connection request sent successfully!');
        } else {
            console.error('Failed to send connection request:', response.status);
            alert('Failed to send connection request.');
        }
    } catch (error) {
        console.error('Error sending connection request:', error);
        alert('Error sending connection request.');
    }
}

// Function to handle form submission for credential stuffing
async function handleCredentialStuffing(event) {
    event.preventDefault();

    const credentialTargetUrl = document.getElementById('credentialTargetUrl').value;
    const usernameList = document.getElementById('usernameList').value;
    const passwordList = document.getElementById('passwordList').value;

    if (!credentialTargetUrl || !usernameList || !passwordList) {
        alert('Please provide the target URL, username list, and password list.');
        return;
    }

    const credentialData = {
        targetUrl: credentialTargetUrl,
        usernames: usernameList.split('\n'),
        passwords: passwordList.split('\n')
    };

    try {
        const response = await fetch('/main/credential', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Credential stuffing attack initiated:', result);
            alert('Credential stuffing attack initiated successfully!');
        } else {
            console.error('Failed to initiate credential stuffing attack:', response.status);
            alert('Failed to initiate credential stuffing attack.');
        }
    } catch (error) {
        console.error('Error initiating credential stuffing attack:', error);
        alert('Error initiating credential stuffing attack.');
    }
}

// Add event listeners to form submissions
document.addEventListener('DOMContentLoaded', () => {
    const ddosForm = document.getElementById('ddosForm');
    if (ddosForm) {
        ddosForm.addEventListener('submit', handleDDoSAttack);
    }

    const defacementForm = document.getElementById('defacementForm');
    if (defacementForm) {
        defacementForm.addEventListener('submit', handleDefacement);
    }

    const connectionForm = document.getElementById('connectionForm');
    if (connectionForm) {
        connectionForm.addEventListener('submit', handleConnection);
    }

    const credentialForm = document.getElementById('credentialForm');
    if (credentialForm) {
        credentialForm.addEventListener('submit', handleCredentialStuffing);
    }
});

// Tabs functionality
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("defaultOpen").click();
});