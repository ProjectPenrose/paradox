
import { consumeProvider, createProvider } from "./Provider";
import { createState, useStateChange } from "./Proxy";
import Pubsub from "./Pubsub";
import Render, { afterRendering, beforeRendering, onRendering } from "./Render";

/**
 * Main libriry interactor class
 * 
 * @since 0.0.1
 */
export default class Paradox {
  constructor() {}
  
  /**
   * Paradox Component getter
   * 
   * Handle what happens when the component is loaded
   * and after it renders
   * 
   * @since 0.0.1
   * @see ./Render.js
   * 
   * @returns {Oject} Component
   * @function beforeRendering Executes before the component is mounted 
   * @function onRendering Executes when the component is loaded 
   * @function afterRendering Executes after the component is rendered 
   */
  static get Component() {
    return {
      beforeRendering,
      onRendering,
      afterRendering,
    }
  }

  /**
   * Patadox Router getter
   * 
   * @since 0.0.1
   * @see ./Router.js
   * 
   * @returns {Funtion} Router function
   */
  static Router() {
    return Router
  }

  /**
   * Paradox Pubsub getter
   * 
   * @since 0.0.1
   * @see ./Pubsub.js
   * 
   * @returns {Instance} instannce of Pubsub
   */
  static get Pubsub() {
    return Pubsub
  }

  /**
   * Render getter
   * 
   * @since 0.0.1
   * @see ./Render.js
   * 
   * @returns {Funtion} Render function
   */
  static get Render() {
    return Render
  }
  
  /**
   * Paradox Provider getter
   * 
   * @since 0.0.1
   * @see ./Provider.js
   * 
   * @returns {Object} Provider
   * @function createProvider Register a provider 
   * @function consumeProvider Get a provider
   */
  static get Provider() {
    return {
      create: createProvider,
      consume: consumeProvider
    }
  }
  
  /**
   * Paradox State getter
   * @see ./Proxy.js
   * 
   * @returns {Object} State
   * @function createProvider Register a state object 
   * @function consumeProvider Execute echa time the state change
   */
  static get State() {
    return {
      create: createState,
      change: useStateChange
    }
  }
}