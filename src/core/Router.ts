type RouteParams = Map<string, (string | string[])>;

// TODO: Add array support for query params

export type RouterProps = {
  queryString?: string;
  params?: RouteParams;
  baseUrl?: string;
  [key: string]: any;
};

export type Route = {
  path: string;
  component?: Function;
  layout?: Function;
  props?: RouterProps;
  pathSegments?: string[];
};

export type RouteList = Route[];

export type RouterOptions = {
  routes?: RouteList;
  baseUrl?: string;
};

export type RouterMemo = {
  [key: string]: string;
};

/**
 * Represents a router that handles routing and navigation in a web application.
 */
export default class Router {
  routes: RouteList;
  baseUrl: string;
  queryString: string;
  path: string;
  query: URLSearchParams;
  params: RouteParams;
  memo: RouterMemo;
  /**
   * Creates a new instance of the Router class.
   * @param {Object} options - The options for configuring the router.
   * @param {Array} options.routes - An array of route objects.
   * @param {string} options.baseUrl - The base URL of the application.
   */
  constructor(options: RouterOptions = {}) {
    const { routes = [], baseUrl = "" } = options;

    this.routes = routes.map(route => ({
      ...route,
      pathSegments: route.path.split("/")
    }));
    this.baseUrl = baseUrl;

    const url = new URL(window.location.href);
    this.queryString = url.search;
    this.path = url.href.replace(this.baseUrl, "").replace(this.queryString, "") || "/";
    this.query = new URLSearchParams(url.search);
    this.params = new Map();

    this.memo = {};
  }

  /**
   * Initializes the router and navigates to the appropriate route.
   * @returns {Promise<string>} A promise that resolves to the current path.
   * @throws {Error} If the route is not found or an error occurs during navigation.
   */
  async init(): Promise<string> {
    let { path } = this;
    const { routes, queryString } = this;

    if (path.includes("#")) path = path.split("#")[0];

    if (this.memo[path]) return this.memo[path];

    const pathSegments = path.split("/");

    const matchedRoute = routes.find(({ pathSegments: routePathSegments }) => {
      if (routePathSegments) {
        if (routePathSegments.length !== pathSegments.length) {
          return false;
        }

        for (let i = 0; i < routePathSegments.length; i++) {
          const routeSegment = routePathSegments[i];
          const pathSegment = pathSegments[i];

          if (!routeSegment.startsWith(":") && routeSegment !== pathSegment) {
            return false;
          } else if (routeSegment.startsWith(":")) {
            this.params.set(routeSegment.slice(1), pathSegment);
          }
        }

        return true;
      }
    });

    if (matchedRoute) {
      try {
        matchedRoute.props = {
          ...matchedRoute.props,
          queryString,
          params: this.params,
          baseUrl: this.baseUrl,
        };
  
        if (matchedRoute.layout && typeof matchedRoute.layout === "function") {
          // Pass the component and its props to the layout
          await matchedRoute.layout(matchedRoute.component, matchedRoute.props);
        } else if (matchedRoute.component && typeof matchedRoute.component === "function") {
          await matchedRoute.component(matchedRoute.props || {});
        } else {
          throw new Error("Route component or layout not found");
        }
  
        this.memo[path] = path;
        return path;
      } catch (error) {
        throw new Error(String(error));
      }
    } else {
      throw new Error(`Route ${path} not found`);
    }
  }
}