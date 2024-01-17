"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Object for caching converted style keys
const memoizedStyleKeys = {};
// Function to convert camelCase into kebab-case for CSS properties
/**
 * Converts a camelCase style key to kebab-case and returns the converted key.
 * If the key has already been processed, the cached value is returned.
 * @param key - The style key to convert.
 * @returns The converted style key.
 */
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
/**
 * Applies the given styles to the specified HTML element.
 *
 * @param element - The HTML element to apply the styles to.
 * @param style - The styles to apply, represented as an object with keys and values.
 */
function applyStyles(element, style) {
    const styleDeclaration = element.style;
    // Apply inline style to the element by converting keys from camelCase
    for (const [key, value] of Object.entries(style)) {
        const styleKey = getStyleKey(key);
        styleDeclaration.setProperty(styleKey, value);
    }
}
exports.default = applyStyles;
