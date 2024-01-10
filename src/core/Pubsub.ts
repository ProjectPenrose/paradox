type EventCallback = (data: any) => void;
type EventMap = { [key: string]: EventCallback[] };
/**
 * PubSub class for implementing publish-subscribe pattern.
 */
class PubSub {
  events: EventMap;

  constructor() {
    this.events = {};
  }

  /**
   * Subscribe to an event.
   * @param {string} event - The event name to subscribe to.
   * @param {function} callback - The callback function to be executed when the event is published.
   * @returns {number} - The number of callbacks subscribed to the event.
   */
  subscribe(event: string, callback: EventCallback): number {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }

    return self.events[event].push(callback);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event - The event name to unsubscribe from.
   * @param {function} callback - The callback function to be removed from the subscribers.
   * @returns {array} - An array of callbacks that remain subscribed to the event.
   */
  unsubscribe(event: string, callback: EventCallback): Array<any> {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = self.events[event].filter((cb) => cb !== callback);
    }

    return self.events[event].filter((cb) => cb !== callback);
  }

  /**
   * Publish an event.
   * @param {string} event - The event name to publish.
   * @param {object} [data={}] - The data to be passed to the event subscribers.
   * @returns {array} - An array of return values from the event subscribers.
   */
  publish(event: string, data: object = {}): Array<any> {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map((callback) => callback(data));
  }
}

const pubsub = new PubSub();

export default pubsub
