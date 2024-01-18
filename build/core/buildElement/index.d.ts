import { ParadoxElementOptions } from "./types";
/**
 * Builds and returns an HTML element based on the provided tag and options.
 *
 * @param {string} tag - The HTML tag for the element.
 * @param {Object} [options] - The options for configuring the element.
 * @param {string} [options.id=""] - The ID of the element.
 * @param {string} [options.classList=""] - The space-separated list of classes for the element.
 * @param {Array} [options.children=[]] - The array of child elements.
 * @param {Object} [options.attributes={}] - The key-value pairs of attributes for the element.
 * @param {Object} [options.events={}] - The key-value pairs of event listeners for the element.
 * @param {string} [options.text=""] - The text content of the element.
 * @param {Object} [options.style={}] - The key-value pairs of inline styles for the element.
 * @returns {HTMLElement} - The constructed HTML element.
 */
export default function buildElement(tag: string, options?: ParadoxElementOptions): HTMLElement;
