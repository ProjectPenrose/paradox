/**
 * Appends an array of child elements to a parent element.
 * 
 * @param element - The parent element to append the children to.
 * @param children - An array of child elements to append.
 * @param buildElement - A function that builds an element based on a tag and options.
 */
function appendChildren(element: HTMLElement, children: Array<any>, buildElement: Function): void {
  // Create a Document Fragment to efficiently append children
  const fragment = document.createDocumentFragment() as DocumentFragment;

  // Append each child to the fragment
  if (children) {
    for (const child of children) {
      // Skip if child is not valid
      if (!child) continue;
      // Recursively build and append child element
      const { tag, options } = child;
      fragment.append(buildElement(tag, options));
    }

    // Append all children at once to the parent element
    element.append(fragment);
  }
}

export default appendChildren;