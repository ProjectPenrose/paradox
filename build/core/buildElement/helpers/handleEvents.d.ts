/**
 * Attaches event listeners to an HTML element.
 *
 * @param element - The HTML element to attach the event listeners to.
 * @param events - An object containing event names as keys and event listeners as values.
 */
declare function handleEvents(element: HTMLElement, events: {
    [key: string]: EventListener;
}): void;
export default handleEvents;
