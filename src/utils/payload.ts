/**
 * Remove empty values from parameters
 * @param {Record<string, unknown>} input
 * @returns {Record<string, string>}
 */
export function omitEmptyParams(
  input: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, v]) => v !== null && v !== undefined && v !== "",
    ),
  ) as Record<string, string>;
}

/**
 * Convert input object to query string
 * Note: it removes empty values from input
 * @param {Record<string, unknown>} input
 * @returns {string}
 */
export function inputToQueryString(input: Record<string, unknown>): string {
  return new URLSearchParams(omitEmptyParams(input)).toString();
}
