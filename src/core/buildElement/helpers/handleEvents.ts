// WeakMap to store event listeners for each element
const eventListeners = new WeakMap();

function handleEvents(element: HTMLElement, events: { [key: string]: EventListener }) {
  // Retrieve or create the event listeners Map for this particular element
  let elementEvents = eventListeners.get(element);
  if (!elementEvents) {
    elementEvents = new Map();
    eventListeners.set(element, elementEvents);
  }

  // Attach events to the element
  for (const [key, value] of Object.entries(events)) {
    // Remove existing event listener if present before adding a new one
    if (elementEvents.has(key)) {
      element.removeEventListener(key, elementEvents.get(key));
    }

    // Add new event listener and update the storage Map
    element.addEventListener(key as string, value as EventListener);
    elementEvents.set(key, value);
  }
}

export default handleEvents;
