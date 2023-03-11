// Declare providers cache
const providesCahce = {}

/**
 * Create a provider
 * 
 * @since 0.0.1
 * 
 * @param {Object} context Provider context
 * @param {Function} callback Provider function
 * @returns {Object} values from the context and the provider function
 */
export function createProvider(context = {}, callback) {
  /**
   * Provide context
   * 
   * @param {Object} values Objects to add to the provider context
   * @param {Object} children Children elements object
   * @returns {Object} Children elements object
   */
  function provider(values = {}, children = {}) {
    // add new values to the context
    context = { ...context, ...values }

    // Cache provider using is name as key and add
    // the contex to it
    providesCahce[callback.name] = context

    return children
  }

  return {
    values: context,
    provider
  }
}

/**
 * Consume a provider by passing the function
 * 
 * @since 0.0.1
 * 
 * @param {Function} provider Provider function (cannot be annonymous)
 * @returns {Object} from cached providers by using the provider name as key
 */
export function consumeProvider(provider) {
  return providesCahce[provider.name]
}