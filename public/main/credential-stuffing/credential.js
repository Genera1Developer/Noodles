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
    console.error(`Login failed for user ${username}:`, error);
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
  for (const credential of credentials) {
    const { username, password } = credential;

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    try {
      const result = await tryLogin(username, password, attemptLogin);

      if (result) {
        success = true;
        console.log(`Success: ${username}, ${password}`);
      } else {
        console.log(`Failed: ${username}, ${password}`);
      }

      if (onCredentialAttempted) {
        onCredentialAttempted(username, password, result);
      }
    } catch (error) {
      console.error("Error during login attempt:", error);
    }
  }

  return success;
}

export { tryLogin, credentialStuffingAttack };