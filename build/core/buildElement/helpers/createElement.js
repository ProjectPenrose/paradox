"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementsCache = {};
/**
 * Creates an HTML element with the specified element name.
 * If the element has been created before, it returns a clone of the cached element.
 * @param elementName - The name of the HTML element to create.
 * @returns The created HTML element.
 */
function createElement(elementName) {
    if (elementsCache[elementName])
        return elementsCache[elementName].cloneNode();
    const element = document.createElement(elementName);
    elementsCache[elementName] = element;
    return element;
}
exports.default = createElement;
