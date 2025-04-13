// ****************************************************************************
// *                                                                          *
// *             SECURITY TESTING TOOL - FOR AUTHORIZED USE ONLY              *
// *                                                                          *
// *  This tool is intended for security testing purposes ONLY, on systems    *
// *  where you have explicit, documented permission to conduct such tests.   *
// *  Unauthorized use is strictly prohibited and may be illegal.            *
// *                                                                          *
// *  By using this tool, you acknowledge that you are solely responsible    *
// *  for any consequences arising from its use. The developers are not      *
// *  liable for any damage or legal issues caused by misuse.                 *
// *                                                                          *
// *  ALWAYS OBTAIN WRITTEN PERMISSION BEFORE USING THIS TOOL.                *
// *                                                                          *
// ****************************************************************************

// --- Configuration ---
const LOG_FILE = 'defacement_log.txt'; // Define your log file path.  Consider making configurable.
const USER_CONSENT_KEY = 'defacementToolConsent';


// --- Utility Functions ---
function logAction(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    // Basic logging.  Improve error handling as needed for production.
    try {
        // Simulating server-side logging.  Replace with actual server-side logging mechanism.
        console.log(logEntry); // Temporary placeholder.  Replace with file system write
    } catch (error) {
        console.error("Error logging action:", error); // Log errors to console.
    }
}

function verifyPermissions(element) {
    // Placeholder for permission verification.  Replace with actual checks.
    // Example: Check if the user has write access to the element's parent.
    console.warn("Permission verification is a placeholder. Implement real permission checks."); //Critical reminder
    logAction(`[WARNING] Permission verification is a placeholder. Implement real permission checks for ${element.tagName}#${element.id || 'No ID'}`);
    return true; // Temporarily allow all actions for demonstration purposes only.
}

function getUserConsent() {
  if (sessionStorage.getItem(USER_CONSENT_KEY) === 'true') {
    return true; // Consent already given during this session
  }

  return new Promise((resolve) => {
    const consent = confirm(
      "WARNING: This tool is for authorized security testing ONLY.\n\n" +
      "Do you have explicit, documented permission to use it on this system?\n\n" +
      "Unauthorized use is strictly prohibited and may be illegal.\n\n" +
      "Click 'OK' to proceed only if you have permission. Clicking 'Cancel' will stop the script."
    );

    if (consent) {
      sessionStorage.setItem(USER_CONSENT_KEY, 'true'); // Store consent for the session
      resolve(true);
    } else {
      resolve(false);
    }
  });
}



// --- Defacement Functions ---
async function changeBackgroundColor(element, color) {
    if (!await getUserConsent()) {
      console.warn("User did not grant consent. Action aborted.");
      logAction("Action aborted: User did not grant consent to change background color.");
      return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to change background color.");
        logAction(`Insufficient permissions to change background color of ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalColor = element.style.backgroundColor; // Store original color
    element.style.backgroundColor = color;
    logAction(`Changed background color of ${element.tagName}#${element.id || 'No ID'} from ${originalColor} to ${color}`);

    // Add a temporary property to revert the change later
    element.dataset.originalBackgroundColor = originalColor;
}


async function changeTextColor(element, color) {
  if (!await getUserConsent()) {
    console.warn("User did not grant consent. Action aborted.");
    logAction("Action aborted: User did not grant consent to change text color.");
    return;
  }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to change text color.");
        logAction(`Insufficient permissions to change text color of ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalColor = element.style.color; // Store original color
    element.style.color = color;
    logAction(`Changed text color of ${element.tagName}#${element.id || 'No ID'} from ${originalColor} to ${color}`);

    // Add a temporary property to revert the change later
    element.dataset.originalTextColor = originalColor;
}

// Example - Revert Changes.  Ideally this would be tied to a UI Element.
function revertChanges(element) {
    if (element.dataset.originalBackgroundColor) {
      element.style.backgroundColor = element.dataset.originalBackgroundColor;
      delete element.dataset.originalBackgroundColor;
      logAction(`Reverted background color of ${element.tagName}#${element.id || 'No ID'}`);
    }

    if (element.dataset.originalTextColor) {
      element.style.color = element.dataset.originalTextColor;
      delete element.dataset.originalTextColor;
      logAction(`Reverted text color of ${element.tagName}#${element.id || 'No ID'}`);
    }
}

// --- Color Theme ---
// This is client-side, so styling is done through the DOM.
function applyRedBlackTheme() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'red';

    // Example: Target all headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.color = 'red';
    });
}


// --- Initialization ---
(async function() {
    applyRedBlackTheme();
    logAction("Defacement tool loaded."); // Log tool loading.

    //Example of how to use the tool (after adding a button on the page that calls these functions):
    //  const myElement = document.getElementById('targetElement');
    //  await changeBackgroundColor(myElement, 'red');
    //  await changeTextColor(myElement, 'black');
})();

// --- Exposed functions ---

window.defacementTool = {
    changeBackgroundColor: changeBackgroundColor,
    changeTextColor: changeTextColor,
    revertChanges: revertChanges
};