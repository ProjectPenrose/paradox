/**
 * Sets the attributes of an HTML element.
 * If the attribute is a boolean attribute, it will only be set if the value is truthy.
 * @param element - The HTML element to set the attributes for.
 * @param attributes - An object containing the attribute key-value pairs.
 */
declare function setAttributes(element: HTMLElement, attributes: {
    [key: string]: string;
}): void;
export default setAttributes;
