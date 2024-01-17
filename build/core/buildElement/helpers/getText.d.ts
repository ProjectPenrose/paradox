/**
 * Retrieves the formatted text for a given input.
 * If the text has been processed and cached, it returns the cached result.
 * If it's the first time, it computes the formatted text, caches it, and returns the result.
 * @param text - The input text to be formatted.
 * @returns The formatted text.
 */
declare function getText(text?: string): string;
export default getText;
