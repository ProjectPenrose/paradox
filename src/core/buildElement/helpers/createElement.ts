type ParadoxElementCache = { [key: string]: HTMLElement };
const elementsCache: ParadoxElementCache = {};

/**
 * Creates an HTML element with the specified element name.
 * If the element has been created before, it returns a clone of the cached element.
 * @param elementName - The name of the HTML element to create.
 * @returns The created HTML element.
 */
function createElement(elementName: string) : HTMLElement {
  if (elementsCache[elementName]) return elementsCache[elementName].cloneNode() as HTMLElement;
  const element = document.createElement(elementName);
  elementsCache[elementName] = element;
  return element;
}

export default createElement;