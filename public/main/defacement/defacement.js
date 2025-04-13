// ****************************************************************************
// * SECURITY TESTING TOOL - FOR AUTHORIZED USE ONLY *
// * This tool is intended for security testing purposes ONLY, on systems *
// * where you have explicit, documented permission to conduct such tests. *
// * Unauthorized use is strictly prohibited and may be illegal. *
// * By using this tool, you acknowledge that you are solely responsible *
// * for any consequences arising from its use. The developers are not *
// * liable for any damage or legal issues caused by misuse. *
// * ALWAYS OBTAIN WRITTEN PERMISSION BEFORE USING THIS TOOL. *
// ****************************************************************************

// --- Configuration ---
const LOG_FILE = 'defacement_log.txt';
const USER_CONSENT_KEY = 'defacementToolConsent';

// --- Utility Functions ---
function logAction(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    try {
        console.log(logEntry); // Placeholder for server-side logging
    } catch (error) {
        console.error("Error logging action:", error);
    }
}

function verifyPermissions(element) {
    console.warn("Permission verification is a placeholder. Implement real permission checks.");
    logAction(`[WARNING] Permission verification is a placeholder. Implement real permission checks for ${element.tagName}#${element.id || 'No ID'}`);
    return true;
}

function getUserConsent() {
    if (sessionStorage.getItem(USER_CONSENT_KEY) === 'true') {
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        const consent = confirm(
            "WARNING: This tool is for authorized security testing ONLY.\n\n" +
            "Do you have explicit, documented permission to use it on this system?\n\n" +
            "Unauthorized use is strictly prohibited and may be illegal.\n\n" +
            "Click 'OK' to proceed only if you have permission. Clicking 'Cancel' will stop the script."
        );

        if (consent) {
            sessionStorage.setItem(USER_CONSENT_KEY, 'true');
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

    const originalColor = element.style.backgroundColor;
    element.style.backgroundColor = color;
    element.dataset.originalBackgroundColor = originalColor;
    logAction(`Changed background color of ${element.tagName}#${element.id || 'No ID'} from ${originalColor} to ${color}`);
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

    const originalColor = element.style.color;
    element.style.color = color;
    element.dataset.originalTextColor = originalColor;
    logAction(`Changed text color of ${element.tagName}#${element.id || 'No ID'} from ${originalColor} to ${color}`);
}

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

// --- Backup and Restore Functions ---
async function backupElement(element) {
    if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to backup element.");
        return null;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to backup element.");
        logAction(`Insufficient permissions to backup ${element.tagName}#${element.id || 'No ID'}`);
        return null;
    }

    const backup = {
        backgroundColor: element.style.backgroundColor,
        color: element.style.color,
        innerHTML: element.innerHTML
    };

    logAction(`Backed up element ${element.tagName}#${element.id || 'No ID'}`);
    return backup;
}

async function restoreElement(element, backup) {
    if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to restore element.");
        return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to restore element.");
        logAction(`Insufficient permissions to restore ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    if (!backup) {
        console.warn("No backup provided.");
        logAction(`No backup provided for ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    element.style.backgroundColor = backup.backgroundColor;
    element.style.color = backup.color;
    element.innerHTML = backup.innerHTML;

    logAction(`Restored element ${element.tagName}#${element.id || 'No ID'}`);
}

// --- Preview Mode ---
async function previewBackgroundColorChange(element, color) {
    if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to preview background color change.");
        return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to preview background color change.");
        logAction(`Insufficient permissions to preview background color change of ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalColor = element.style.backgroundColor;
    element.style.backgroundColor = color;

    // Revert after a short delay (e.g., 2 seconds)
    setTimeout(() => {
        element.style.backgroundColor = originalColor;
    }, 2000);

    logAction(`Previewed background color change of ${element.tagName}#${element.id || 'No ID'}`);
}


// --- Color Theme ---
function applyRedBlackTheme() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'red';

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.color = 'red';
    });
}

// --- Initialization ---
(async function () {
    applyRedBlackTheme();
    logAction("Defacement tool loaded.");

    // Example usage:
    // const myElement = document.getElementById('targetElement');
    // await changeBackgroundColor(myElement, 'red');
    // await changeTextColor(myElement, 'black');
})();

// --- Exposed functions ---
window.defacementTool = {
    changeBackgroundColor: changeBackgroundColor,
    changeTextColor: changeTextColor,
    revertChanges: revertChanges,
    backupElement: backupElement,
    restoreElement: restoreElement,
    previewBackgroundColorChange: previewBackgroundColorChange
};