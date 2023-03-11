/**
 * Manage publish subscribers pattern
 * 
 * @since 0.0.1
 */
class Pubsub {
  /**
   * create an events object to storage
   * subscribers
   */
  constructor() {
    this.events = {}
  }

  /**
   * Subscribe to events
   * 
   * @since 0.0.1
   * 
   * @param {String} eventName the event to subscribe to
   * @param {Function} handler The callback function that
   * will be executed once the event is published
   */
  subscribe(eventName, handler) {
    // If the event doesnot exist in the events object
    // as a property, create it as an array and push the
    // calback function to it.
    if (!this.events[eventName]) this.events[eventName] = []
    this.events[eventName].push(handler)
  }

  /**
   * Unsubscribe to event
   * 
   * @since 0.0.1
   * 
   * @param {String} eventName Event name
   * @param {Function} handler Callback function
   */
  unsubscribe(eventName, handler) {
    // If the event exists as a property of the events object
    // Loop through the array of callbacks and remove the one
    // matching the passed handler
    if (this.events[eventName] && this.events[eventName].length) {
      this.events[eventName].forEach((fn, i) => {
        console.log(fn.name, handler.name);
        if (fn.name === handler.name) this.events[eventName].splice(i, 1)
      })
    }
  }
  
  /**
   * Triigers an event
   * 
   * @since 0.0.1
   * 
   * @param {String} eventName Event name
   * @param {any} data Data shared trhough the event
   */
  publish(eventName, data) {
    // If the event exists as a property of the events object
    // Loop through the array of callbacks and execute each
    // handler passing the data
    if (this.events[eventName] && this.events[eventName].length) {
      this.events[eventName].forEach(handler => {
        handler(data)
      })
    }
  }
}

export default new Pubsub()