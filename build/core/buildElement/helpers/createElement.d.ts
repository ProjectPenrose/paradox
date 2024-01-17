/**
 * Creates an HTML element with the specified element name.
 * If the element has been created before, it returns a clone of the cached element.
 * @param elementName - The name of the HTML element to create.
 * @returns The created HTML element.
 */
declare function createElement(elementName: string): HTMLElement;
export default createElement;
