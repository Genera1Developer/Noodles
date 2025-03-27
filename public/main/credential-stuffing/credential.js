/**
 * Simulates a credential stuffing attack.
 * @param {string} username The username.
 * @param {string} password The password.
 * @param {function} attemptLogin Attempts login.
 * @returns {Promise<boolean>} Login status.
 */
async function tryLogin(username, password, attemptLogin) {
  try {
    return await attemptLogin(username, password);
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

/**
 * Executes credential stuffing.
 * @param {Array<{username: string, password: string}>} credentials User credentials.
 * @param {function} attemptLogin Attempts login.
 * @param {function} onCredentialAttempted Callback after attempt.
 * @returns {Promise<boolean>} Overall success.
 */
async function credentialStuffingAttack(credentials, attemptLogin, onCredentialAttempted) {
  let success = false;

  for (const credential of credentials) {
    const { username, password } = credential;
    const result = await tryLogin(username, password, attemptLogin);

    if (result) {
      success = true;
      console.log(`Success: ${username}, ${password}`);
      break;
    } else {
      console.log(`Failed: ${username}, ${password}`);
    }

    if (onCredentialAttempted) {
      onCredentialAttempted(username, password, result);
    }
  }

  return success;
}

export { tryLogin, credentialStuffingAttack };