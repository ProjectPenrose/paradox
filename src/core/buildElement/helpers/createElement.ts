const elementsCache: { [key: string]: HTMLElement } = {};

function createElement(elementName: string) : HTMLElement {
  if (elementsCache[elementName]) return elementsCache[elementName].cloneNode() as HTMLElement;
  const element = document.createElement(elementName);
  elementsCache[elementName] = element;
  return element;
}

export default createElement;