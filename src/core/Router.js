// Routes cache
const routes = {}

/**
 * Create a route
 * 
 * @since 0.0.1
 * 
 * @param {String} href current url
 * @returns {Funtion} route handler
 */
export default function Router(href) {
  // declare defaultCallback in case the route has no callback
  const defaultCallback = () => null

  // Cache routes
  Object.keys(this).forEach(route => {
    routes[route] = this[route] || defaultCallback
  })

  // Get potential matches from the path name
  const potentialMatches = Object.keys(routes).map((path) => {
    return {
      handler: routes[path],
      result: location.pathname.match(new RegExp(`^${path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`)),
    };
  })

  // Get current route from potential matches
  let currentRoute = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // Return current router handler
  return currentRoute.handler
}