"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementsCache = {};
function createElement(elementName) {
    if (elementsCache[elementName])
        return elementsCache[elementName].cloneNode();
    const element = document.createElement(elementName);
    elementsCache[elementName] = element;
    return element;
}
exports.default = createElement;
