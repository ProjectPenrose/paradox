export type EventCallback = (data: any) => void;
export type EventMap = {
    [key: string]: Set<EventCallback>;
};
/**
 * PubSub class for implementing publish-subscribe pattern.
 */
declare class PubSub {
    events: EventMap;
    constructor();
    /**
     * Subscribe to an event.
     * @param {string} event - The event name to subscribe to.
     * @param {function} callback - The callback function to be executed when the event is published.
     * @returns {number} - The number of callbacks subscribed to the event.
     */
    subscribe(event: string, callback: EventCallback): Set<EventCallback>;
    /**
     * Unsubscribe from an event.
     * @param {string} event - The event name to unsubscribe from.
     * @param {function} callback - The callback function to be removed from the subscribers.
     * @returns {array} - An array of callbacks that remain subscribed to the event.
     */
    unsubscribe(event: string, callback: EventCallback): Set<EventCallback>;
    /**
     * Publish an event.
     * @param {string} event - The event name to publish.
     * @param {object} [data={}] - The data to be passed to the event subscribers.
     * @returns {array} - An array of return values from the event subscribers.
     */
    publish(event: string, data?: object): Array<any>;
}
declare const pubsub: PubSub;
export default pubsub;
