/**
 * Returns token payload
 * @param {string} token jwt token
 * @returns {Record<string, unknown>}
 */
export function getTokenPayload(token: string): Record<string, unknown> {
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  return decodedPayload;
}

/**
 * Get token expiration
 * @param {string} token
 * @returns {number}
 */
export function getTokenExpiration(token: string): number {
  // Decode the token's payload
  const decodedPayload = getTokenPayload(token);
  return (decodedPayload.exp as number) || 0;
}

/**
 * Get token info
 * @param {string} token
 * @returns {{ first_name: string; last_name: string }}
 */
export function getTokenInfo(token: string) {
  const decodedPayload = getTokenPayload(token);
  return {
    first_name: decodedPayload.first_name as string,
    last_name: decodedPayload.last_name as string,
  };
}

/**
 * Check token is about to expire
 * @param {string} token
 * @param {number} thresholdInSeconds
 * @returns {boolean}
 */
export function isTokenAboutToExpire(
  token: string,
  thresholdInSeconds = 600,
): boolean {
  const expiration = getTokenExpiration(token);

  // Get the current time
  const currentTime = Math.floor(Date.now() / 1000);

  // Calculate the time remaining until expiration
  const timeRemaining = expiration - currentTime;

  // Check if the token is about to expire
  return timeRemaining < thresholdInSeconds;
}

/**
 * Check if token is expired
 * @param {string} token
 * @returns {boolean}
 */
export function isTokenExpired(token: string): boolean {
  const expiration = getTokenExpiration(token);

  // Get the current time
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token is expired
  return expiration < currentTime;
}
