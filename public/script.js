document.addEventListener('DOMContentLoaded', function() {
    // Function to open tabs
    window.openTab = function(tabName) {
        let i, tabContent, tabBtn;
        tabContent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        tabBtn = document.getElementsByClassName("tab-btn");
        for (i = 0; i < tabBtn.length; i++) {
            tabBtn[i].className = tabBtn[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        // Add active class to the button
        const btn = Array.from(tabBtn).find(el => el.textContent.trim() === tabName);
        if (btn) {
            btn.className += " active";
        }
    }

    // Initialize the Credential page
    const credentialButton = document.querySelector('.side-panel').children[3];
    if (credentialButton) {
        credentialButton.classList.add('active');
    }
    document.getElementById('Credential').style.display = 'block';

    // Event listeners for credential stuffing
    const startStuffingButton = document.getElementById('start-stuffing');
    if (startStuffingButton) {
        startStuffingButton.addEventListener('click', function() {
            const targetUrl = document.getElementById('target-url').value;
            const usernameList = document.getElementById('username-list').value;
            const passwordList = document.getElementById('password-list').value;
            const statusMessage = document.getElementById('status-message');

            statusMessage.textContent = 'Status: Running credential stuffing...';

            // Simulate credential stuffing (replace with actual logic)
            setTimeout(function() {
                statusMessage.textContent = `Status: Credential stuffing completed for ${targetUrl}`;
            }, 3000); // Simulate a 3-second operation
        });
    }

    // Event listeners for DDoS attack
    const startDDoSButton = document.getElementById('start-ddos');
    if (startDDoSButton) {
        startDDoSButton.addEventListener('click', function() {
            const ddosTargetUrl = document.getElementById('ddos-target-url').value;
            const ddosThreads = document.getElementById('ddos-threads').value;
            const ddosStatusMessage = document.getElementById('ddos-status-message');
            const mbpsDisplay = document.getElementById('mbps');
            const packetsSentDisplay = document.getElementById('packets-sent');
            const targetStatusDisplay = document.getElementById('target-status');
            const timeElapsedDisplay = document.getElementById('time-elapsed');

            ddosStatusMessage.textContent = 'Status: Launching DDoS attack...';
            let packetsSent = 0;
            let startTime = new Date().getTime();

            // Simulate DDoS attack (replace with actual logic)
            const ddosInterval = setInterval(function() {
                packetsSent += 100;
                mbpsDisplay.textContent = (Math.random() * 10).toFixed(2); // Simulate MBPS
                packetsSentDisplay.textContent = packetsSent;
                targetStatusDisplay.textContent = (packetsSent % 2 === 0) ? 'Online' : 'Unresponsive'; //Simulate target status
                let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
                timeElapsedDisplay.textContent = elapsedTime;

                if (elapsedTime >= 20) {
                    clearInterval(ddosInterval);
                    ddosStatusMessage.textContent = `Status: DDoS attack completed for ${ddosTargetUrl}`;
                    targetStatusDisplay.textContent = 'Online';
                }
            }, 1000);
        });
    }

    // Event listeners for website defacement
    const startDefacementButton = document.getElementById('start-defacement');
    if (startDefacementButton) {
        startDefacementButton.addEventListener('click', function() {
            const defacementTargetUrl = document.getElementById('defacement-target-url').value;
            const defacementMessage = document.getElementById('defacement-message').value;
            const defacementStatusMessage = document.getElementById('defacement-status-message');

            defacementStatusMessage.textContent = 'Status: Initiating defacement...';

            // Simulate defacement (replace with actual logic)
            setTimeout(function() {
                defacementStatusMessage.textContent = `Status: Website defaced: ${defacementTargetUrl} with message: ${defacementMessage}`;
            }, 4000); // Simulate a 4-second operation
        });
    }

    // Event listeners for establishing connection
    const startConnectionButton = document.getElementById('start-connection');
    if (startConnectionButton) {
        startConnectionButton.addEventListener('click', function() {
            const connectionTargetIp = document.getElementById('connection-target-ip').value;
            const connectionTargetPort = document.getElementById('connection-target-port').value;
            const connectionStatusMessage = document.getElementById('connection-status-message');

            connectionStatusMessage.textContent = 'Status: Establishing connection...';

            // Simulate connection (replace with actual logic)
            setTimeout(function() {
                connectionStatusMessage.textContent = `Status: Connection established to ${connectionTargetIp}:${connectionTargetPort}`;
            }, 5000); // Simulate a 5-second operation
        });
    }

    // Dark theme toggle functionality (if needed)
    const toggleThemeButton = document.getElementById('toggle-theme');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
        });
    }
});