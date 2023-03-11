function useContext(provider) {
  return provider()
}

function createContext(context = {}) {
  function provider(values = {}) {
    context = { ...context, ...values }
    return context
  }
  function registerValues(values) {
    context = { ...context, ...values }
  }
  return {
    provider,
    registerValues
  }
}

export { useContext, createContext }