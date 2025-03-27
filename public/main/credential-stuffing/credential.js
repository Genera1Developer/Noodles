// credential.js

/**
 * Simulates a credential stuffing attack.
 *
 * @param {string} username The username to try.
 * @param {string} password The password to try.
 * @param {function} attemptLogin A function that attempts to log in with the given credentials.  Should return a promise.
 * @returns {Promise<boolean>} A promise that resolves to true if the login was successful, false otherwise.  Rejects if there's an error.
 */
async function tryLogin(username, password, attemptLogin) {
  try {
    const result = await attemptLogin(username, password);
    return result; // Assuming attemptLogin returns true/false or a similar success indicator.  Adjust as needed.
  } catch (error) {
    console.error("Login attempt failed:", error);
    return false; // Or re-throw the error if you want the caller to handle it.  Consider the desired behavior.
  }
}

/**
 * Executes a credential stuffing attack against a list of credentials.
 *
 * @param {Array<{username: string, password: string}>} credentials An array of username/password objects.
 * @param {function} attemptLogin A function that attempts to log in with the given credentials. Should return a promise.
 * @param {function} onCredentialAttempted Optional callback function to execute after each login attempt, receiving the username, password and success status.
 * @returns {Promise<boolean>} A promise that resolves to true if any login was successful, false otherwise.
 */
async function credentialStuffingAttack(credentials, attemptLogin, onCredentialAttempted) {
  let successfulLogin = false;

  for (const credential of credentials) {
    const { username, password } = credential;
    const success = await tryLogin(username, password, attemptLogin);

    if (success) {
      successfulLogin = true;
      console.log(`Successful login with username: ${username}, password: ${password}`);
      // You might want to stop after the first successful login depending on the use case
      break; // Remove this line if you want to try all credentials.
    } else {
      console.log(`Failed login with username: ${username}, password: ${password}`);
    }

    if (onCredentialAttempted) {
      onCredentialAttempted(username, password, success);
    }
  }

  return successfulLogin;
}


export { tryLogin, credentialStuffingAttack };