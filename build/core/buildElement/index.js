"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getText_1 = __importDefault(require("./helpers/getText"));
const setAttributes_1 = __importDefault(require("./helpers/setAttributes"));
const handleEvents_1 = __importDefault(require("./helpers/handleEvents"));
const applyStyles_1 = __importDefault(require("./helpers/applyStyles"));
const appendChildren_1 = __importDefault(require("./helpers/appendChildren"));
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
function buildElement(tag, options = { id: "", classList: "", children: [], attributes: {}, events: {}, text: "", style: {} }) {
    // Return empty string if tag is not provided
    if (!tag)
        throw new Error("Tag is required");
    // Destructure and provide default values for the options parameter
    const { id = "", classList = "", children = [], attributes = {}, events = {}, text = "", style = {} } = options;
    // Create a new HTML element TODO: Review createElement function
    const element = document.createElement(tag);
    // Set the element ID if provided
    if (id)
        element.id = id.trim();
    // Add class(es) to the element if any are provided
    if (classList) {
        for (let className of classList.split(" ")) {
            if (className)
                element.classList.add(className.trim());
        }
    }
    // Set the attributes for the element
    (0, setAttributes_1.default)(element, attributes);
    // Retrieve or create the event listeners Map for this particular element
    (0, handleEvents_1.default)(element, events);
    // Apply inline styles to the element
    (0, applyStyles_1.default)(element, style);
    // Set the text content of the element after processing
    if (text)
        element.textContent = (0, getText_1.default)(text);
    // Append children to the element
    (0, appendChildren_1.default)(element, children, buildElement);
    // Return the fully constructed element
    return element;
}
exports.default = buildElement;
