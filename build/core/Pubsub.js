"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            self.events[event] = new Set();
        }
        return self.events[event].add(callback);
    }
    /**
     * Unsubscribe from an event.
     * @param {string} event - The event name to unsubscribe from.
     * @param {function} callback - The callback function to be removed from the subscribers.
     * @returns {array} - An array of callbacks that remain subscribed to the event.
     */
    unsubscribe(event, callback) {
        let self = this;
        if (!self.events.hasOwnProperty(event)) {
            self.events[event].delete(callback);
        }
        return self.events[event];
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
        return [...self.events[event]].map((callback) => {
            try {
                return callback(data);
            }
            catch (e) {
                console.warn(e);
                return null;
            }
        });
    }
}
const pubsub = new PubSub();
exports.default = pubsub;
