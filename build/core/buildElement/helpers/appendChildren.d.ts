/**
 * Appends an array of child elements to a parent element.
 *
 * @param element - The parent element to append the children to.
 * @param children - An array of child elements to append.
 * @param buildElement - A function that builds an element based on a tag and options.
 */
declare function appendChildren(element: HTMLElement, children: Array<any>, buildElement: Function): void;
export default appendChildren;
