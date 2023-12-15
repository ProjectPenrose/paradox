/**
 * PubSub class for implementing publish-subscribe pattern.
 */
class PubSub {
  constructor() {
    this.events = {};
  }

  /**
   * Subscribe to an event.
   * @param {string} event - The event name to subscribe to.
   * @param {function} callback - The callback function to be executed when the event is published.
   * @returns {number} - The number of callbacks subscribed to the event.
   */
  subscribe(event, callback) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }

    return self.events[event].push(callback);
  }

  /**
   * Publish an event.
   * @param {string} event - The event name to publish.
   * @param {object} [data={}] - The data to be passed to the event subscribers.
   * @returns {array} - An array of return values from the event subscribers.
   */
  publish(event, data = {}) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map((callback) => callback(data));
  }
}

const pubsub = new PubSub();

export default pubsub
