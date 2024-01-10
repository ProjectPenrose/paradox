"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Object for caching converted style keys
const memoizedStyleKeys = {};
// Function to convert camelCase into kebab-case for CSS properties
function getStyleKey(key = "") {
    // Check if the key is already processed and return the cached value if so
    if (memoizedStyleKeys[key] !== undefined) {
        return memoizedStyleKeys[key];
    }
    // Convert camelCase to kebab-case
    const styleKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    // Store the result in cache
    memoizedStyleKeys[key] = styleKey;
    // Return the converted key
    return styleKey;
}
exports.default = getStyleKey;
