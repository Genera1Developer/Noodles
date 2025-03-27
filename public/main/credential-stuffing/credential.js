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
 * @returns {Promise<void>}
 */
async function credentialStuffingAttack(credentials, attemptLogin, onCredentialAttempted, delay = 0) {
  for (const credential of credentials) {
    const { username, password } = credential;

    if (!username || !password) {
      console.warn("Skipping credential due to missing username or password.");
      continue;
    }

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    try {
      const result = await tryLogin(username, password, attemptLogin);

      if (onCredentialAttempted) {
        onCredentialAttempted(username, password, result);
      }
    } catch (error) {
      console.error("Error during login attempt:", error);
    }
  }
}

export { tryLogin, credentialStuffingAttack };