function appendChildren(element: HTMLElement, children: Array<any>, buildElement: Function) {
  // Create a Document Fragment to efficiently append children
  const fragment = document.createDocumentFragment();

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