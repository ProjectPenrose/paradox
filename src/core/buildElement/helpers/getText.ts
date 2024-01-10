// Object for caching processed text values
const memoizedText:{ [key: string]: string } = {};
// Function to retrieve or compute a formatted text value
function getText(text = "") {
  // Check if the text has been processed and cached; return it if so
  if (memoizedText[text] !== undefined) {
    return memoizedText[text];
  }

  // If it's the first time, compute the formatted text
  const result = typeof text === "string"
    ? text.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    : String(text);

  // Cache the result for future use
  memoizedText[text] = result;

  // Return the processed text
  return result;
}

export default getText;
