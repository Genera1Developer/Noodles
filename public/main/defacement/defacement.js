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
    return true; //Modified for now.
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

async function replaceText(element, newText) {
    if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to replace text.");
        return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to replace text.");
        logAction(`Insufficient permissions to replace text of ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalText = element.innerText;
    element.innerText = newText;
    element.dataset.originalText = originalText;
    logAction(`Replaced text of ${element.tagName}#${element.id || 'No ID'} from ${originalText} to ${newText}`);
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

    if (element.dataset.originalText) {
        element.innerText = element.dataset.originalText;
        delete element.dataset.originalText;
        logAction(`Reverted text of ${element.tagName}#${element.id || 'No ID'}`);
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
        innerHTML: element.innerHTML,
        innerText: element.innerText
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
    element.innerText = backup.innerText;


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
    logAction("Defacement tool loaded. Get ready to cause some mayhem!");

    // Example usage:
    // const myElement = document.getElementById('targetElement');
    // await changeBackgroundColor(myElement, 'red');
    // await changeTextColor(myElement, 'black');
})();

// --- Exposed functions ---
window.defacementTool = {
    changeBackgroundColor: changeBackgroundColor,
    changeTextColor: changeTextColor,
    replaceText: replaceText,
    revertChanges: revertChanges,
    backupElement: backupElement,
    restoreElement: restoreElement,
    previewBackgroundColorChange: previewBackgroundColorChange,
    previewTextColorChange: previewTextColorChange,
    previewReplaceText: previewReplaceText,
    applyGlitchEffect: applyGlitchEffect
};

async function previewTextColorChange(element, color) {
    if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to preview text color change.");
        return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to preview text color change.");
        logAction(`Insufficient permissions to preview text color change of ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalColor = element.style.color;
    element.style.color = color;

    // Revert after a short delay (e.g., 2 seconds)
    setTimeout(() => {
        element.style.color = originalColor;
    }, 2000);

    logAction(`Previewed text color change of ${element.tagName}#${element.id || 'No ID'}`);
}

async function previewReplaceText(element, newText) {
        if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to preview text replace.");
        return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to preview text replace.");
        logAction(`Insufficient permissions to preview text replace of ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalText = element.innerText;
    element.innerText = newText;

    // Revert after a short delay (e.g., 2 seconds)
    setTimeout(() => {
        element.innerText = originalText;
    }, 2000);

    logAction(`Previewed text replace of ${element.tagName}#${element.id || 'No ID'}`);
}

async function applyGlitchEffect(element) {
    if (!await getUserConsent()) {
        console.warn("User did not grant consent. Action aborted.");
        logAction("Action aborted: User did not grant consent to apply glitch effect.");
        return;
    }

    if (!verifyPermissions(element)) {
        console.warn("Insufficient permissions to apply glitch effect.");
        logAction(`Insufficient permissions to apply glitch effect on ${element.tagName}#${element.id || 'No ID'}`);
        return;
    }

    const originalText = element.innerText;
    let glitchInterval = setInterval(() => {
        const randomChars = Math.random().toString(36).substring(2, 7);
        element.innerText = randomChars;
        setTimeout(() => {
            element.innerText = originalText;
        }, 100);
    }, 200);

    // Stop glitch after a short duration (e.g., 3 seconds)
    setTimeout(() => {
        clearInterval(glitchInterval);
        element.innerText = originalText;
    }, 3000);

    logAction(`Applied glitch effect on ${element.tagName}#${element.id || 'No ID'}`);
}