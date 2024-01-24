import getText from "./helpers/getText";
import setAttributes from "./helpers/setAttributes";
import handleEvents from "./helpers/handleEvents";
import applyStyles from "./helpers/applyStyles";
import appendChildren from "./helpers/appendChildren";

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
export default function buildElement(
  tag: string,
  options: ParadoxElementOptions = { id: "", classList: "", children: [], attributes: {}, events: {}, text: "", style: {} }
): HTMLElement {
  // Return empty string if tag is not provided
  if (!tag) throw new Error("Tag is required");
  // Destructure and provide default values for the options parameter
  const { id = "", classList = "", children = [], attributes = {}, events = {}, text = "", style = {} } = options;

  // Create a new HTML element TODO: Review createElement function
  const element = document.createElement(tag);

  // Set the element ID if provided
  if (id) element.id = id.trim();

  // Add class(es) to the element if any are provided
  if (classList) {
    for (let className of classList.split(" ")) {
      if (className) element.classList.add(className.trim());
    }
  }

  // Set the attributes for the element
  setAttributes(element, attributes);

  // Retrieve or create the event listeners Map for this particular element
  handleEvents(element, events);

  // Apply inline styles to the element
  applyStyles(element, style);

  // Set the text content of the element after processing
  if (text) element.textContent = getText(text);
  
  // Append children to the element
  appendChildren(element, children, buildElement);

  // Return the fully constructed element
  return element;
}