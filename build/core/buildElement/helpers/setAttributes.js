"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// List of boolean attributes that need special handling
const booleanAttributes = [
    "disabled",
    "checked",
    "selected",
    "readonly",
    "required",
    "multiple",
    "autofocus",
    "formnovalidate",
    "autocompleted",
];
/**
 * Sets the attributes of an HTML element.
 * If the attribute is a boolean attribute, it will only be set if the value is truthy.
 * @param element - The HTML element to set the attributes for.
 * @param attributes - An object containing the attribute key-value pairs.
 */
function setAttributes(element, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
        // Attributes like disabled, checked, selected need special handling
        if (booleanAttributes.includes(key)) {
            if (value)
                element.setAttribute(key, String(value));
        }
        else
            element.setAttribute(key, String(value));
    }
}
exports.default = setAttributes;
