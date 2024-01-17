"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WeakMap to store event listeners for each element
const eventListeners = new WeakMap();
/**
 * Attaches event listeners to an HTML element.
 *
 * @param element - The HTML element to attach the event listeners to.
 * @param events - An object containing event names as keys and event listeners as values.
 */
function handleEvents(element, events) {
    // Retrieve or create the event listeners Map for this particular element
    let elementEvents = eventListeners.get(element);
    if (!elementEvents) {
        elementEvents = new Map();
        eventListeners.set(element, elementEvents);
    }
    // Attach events to the element
    for (const [key, value] of Object.entries(events)) {
        // Remove existing event listener if present before adding a new one
        if (elementEvents.has(key)) {
            element.removeEventListener(key, elementEvents.get(key));
        }
        // Add new event listener and update the storage Map
        element.addEventListener(key, value);
        elementEvents.set(key, value);
    }
}
exports.default = handleEvents;
