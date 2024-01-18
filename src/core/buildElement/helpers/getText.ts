import { ParadoxElementMemoizedText } from "../types";

const memoizedText: ParadoxElementMemoizedText = {};
// Function to retrieve or compute a formatted text value

/**
 * Formats the given text by replacing any occurrences of "\\xHH" with the corresponding character.
 * 
 * @param text The text to format.
 * @returns The formatted text.
 */
function formatText(text: string = ""): string {
  return text.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Retrieves the formatted text for a given input.
 * If the text has been processed and cached, it returns the cached result.
 * If it's the first time, it computes the formatted text, caches it, and returns the result.
 * @param text - The input text to be formatted.
 * @returns The formatted text.
 */
function getText(text: string = ""): string {
  // Check if the text has been processed and cached; return it if so
  if (memoizedText[text] !== undefined) {
    return memoizedText[text];
  }

  // If it's the first time, compute the formatted text
  const result = (typeof text === "string")
    ? formatText(text)
    : String(text);

  // Cache the result for future use
  memoizedText[text] = result;

  // Return the processed text
  return result;
}

export default getText;
