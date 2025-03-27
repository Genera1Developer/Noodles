// script.js

// Function to handle form submission and trigger the attack
async function startAttack(event) {
    event.preventDefault();

    const target = document.getElementById('target').value;
    const attackType = document.getElementById('attackType').value;
    const duration = parseInt(document.getElementById('duration').value);
    const threads = parseInt(document.getElementById('threads').value);
    const port = parseInt(document.getElementById('port').value);

    // Validate inputs (basic validation)
    if (!target) {
        alert('Please enter a target URL or IP address.');
        return;
    }

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

    // Disable the form during the attack
    document.getElementById('attackForm').disabled = true;

    // Call the appropriate attack function based on the selected attack type
    try {
        let result;
        switch (attackType) {
            case 'tcpFlood':
                result = await tcpFloodAttack(target, port, threads, duration);
                break;
            case 'httpFlood':
                result = await httpFloodAttack(target, threads, duration);
                break;
            case 'slowloris':
                result = await slowlorisAttack(target, port, threads, duration);
                break;
            // Add more attack types here as needed
            default:
                alert('Invalid attack type selected.');
                document.getElementById('attackForm').disabled = false;
                return;
        }

        // Handle the result of the attack
        if (result && result.status === 'success') {
            alert('Attack completed successfully!');
        } else {
            alert('Attack failed. See console for details.');
        }
    } catch (error) {
        console.error('Error during attack:', error);
        alert('An error occurred during the attack. See console for details.');
    } finally {
        // Re-enable the form
        document.getElementById('attackForm').disabled = false;
    }
}

// TCP Flood Attack Function
async function tcpFloodAttack(target, port, threads, duration) {
    return new Promise((resolve, reject) => {
        fetch('/main/tcpFlood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target, port, threads, duration })
        })
        .then(response => response.json())
        .then(data => {
            console.log('TCP Flood Attack Result:', data);
            resolve(data);
        })
        .catch(error => {
            console.error('Error during TCP Flood Attack:', error);
            reject(error);
        });
    });
}

// HTTP Flood Attack Function
async function httpFloodAttack(target, threads, duration) {
     return new Promise((resolve, reject) => {
        fetch('/main/httpFlood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target, threads, duration })
        })
        .then(response => response.json())
        .then(data => {
            console.log('HTTP Flood Attack Result:', data);
            resolve(data);
        })
        .catch(error => {
            console.error('Error during HTTP Flood Attack:', error);
            reject(error);
        });
    });
}

// Slowloris Attack Function
async function slowlorisAttack(target, port, threads, duration) {
    return new Promise((resolve, reject) => {
        fetch('/main/slowloris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target, port, threads, duration })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Slowloris Attack Result:', data);
            resolve(data);
        })
        .catch(error => {
            console.error('Error during Slowloris Attack:', error);
            reject(error);
        });
    });
}

// Function to update statistics display (Placeholder - Implement Real-Time Updates)
function updateStatistics(mbps, packets, status, time) {
    document.getElementById('mbps').innerText = mbps;
    document.getElementById('packets').innerText = packets;
    document.getElementById('status').innerText = status;
    document.getElementById('time').innerText = time;
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const attackForm = document.getElementById('attackForm');
    if (attackForm) {
        attackForm.addEventListener('submit', startAttack);
    } else {
        console.error('Attack form not found.');
    }
});

// Navigation Tabs
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