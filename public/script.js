document.addEventListener('DOMContentLoaded', function() {
    // Tab Management
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function openTab(tabName) {
        tabContents.forEach(tabContent => {
            tabContent.style.display = 'none';
        });
        document.getElementById(tabName).style.display = 'block';
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.trim(); // Use textContent for robustness
            openTab(tabName);
        });
    });

    // Attack Functions - Placeholder implementations (TO BE IMPLEMENTED)
    function startDDoSAttack(targetUrl, threads) {
        console.log(`Starting DDoS attack on ${targetUrl} with ${threads} threads...`);
        // Placeholder: Implement DDoS attack logic here
        updateDDoSStatus("Attacking...", "N/A", "N/A", "Online", "Starting...");
    }

    function startDefacement(targetUrl, message) {
        console.log(`Starting defacement of ${targetUrl} with message: ${message}`);
        // Placeholder: Implement website defacement logic here
        updateDefacementStatus("Defacing...", "Starting...");
    }

    function startConnection(targetIp, targetPort) {
        console.log(`Attempting to connect to ${targetIp}:${targetPort}...`);
        // Placeholder: Implement connection logic here
        updateConnectionStatus("Connecting...", "Starting...");
    }

    function startCredentialStuffing(targetUrl, usernames, passwords) {
        console.log(`Starting credential stuffing attack on ${targetUrl} with ${usernames.length} usernames and ${passwords.length} passwords...`);
        updateCredentialStatus("Stuffing...", "Starting...");
        // Placeholder: Implement credential stuffing logic here
    }

    // UI Interaction and Event Listeners
    const ddosStartButton = document.getElementById('start-ddos');
    if (ddosStartButton) {
        ddosStartButton.addEventListener('click', function() {
            const targetUrl = document.getElementById('ddos-target-url').value;
            const threads = document.getElementById('ddos-threads').value;
            startDDoSAttack(targetUrl, threads);
        });
    }

    const defacementStartButton = document.getElementById('start-defacement');
    if (defacementStartButton) {
        defacementStartButton.addEventListener('click', function() {
            const targetUrl = document.getElementById('defacement-target-url').value;
            const message = document.getElementById('defacement-message').value;
            startDefacement(targetUrl, message);
        });
    }

    const connectionStartButton = document.getElementById('start-connection');
    if (connectionStartButton) {
        connectionStartButton.addEventListener('click', function() {
            const targetIp = document.getElementById('connection-target-ip').value;
            const targetPort = document.getElementById('connection-target-port').value;
            startConnection(targetIp, targetPort);
        });
    }

    const credentialStartButton = document.getElementById('start-stuffing');
    if (credentialStartButton) {
        credentialStartButton.addEventListener('click', function() {
            const targetUrl = document.getElementById('target-url').value;
            const usernames = document.getElementById('username-list').value.split('\n');
            const passwords = document.getElementById('password-list').value.split('\n');
            startCredentialStuffing(targetUrl, usernames, passwords);
        });
    }


    // Status Update Functions
    function updateDDoSStatus(status, mbps, packets, targetStatus, timeElapsed) {
        document.getElementById('ddos-status-message').textContent = `Status: ${status}`;
        document.getElementById('mbps').textContent = mbps;
        document.getElementById('packets-sent').textContent = packets;
        document.getElementById('target-status').textContent = targetStatus;
        document.getElementById('time-elapsed').textContent = timeElapsed;
    }

    function updateDefacementStatus(status, message) {
        document.getElementById('defacement-status-message').textContent = `Status: ${status} ${message}`;
    }

    function updateConnectionStatus(status, message) {
        document.getElementById('connection-status-message').textContent = `Status: ${status} ${message}`;
    }

    function updateCredentialStatus(status, message) {
        document.getElementById('status-message').textContent = `Status: ${status} ${message}`;
    }

    // Initialize - Open the first tab by default
    openTab('DDoS');
});