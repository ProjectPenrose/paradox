type RouteParams = Map<string, (string | string[])>;
export type RouterProps = {
    queryString?: string;
    params?: RouteParams;
    baseUrl?: string;
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
    constructor(options?: RouterOptions);
    /**
     * Initializes the router and navigates to the appropriate route.
     * @returns {Promise<string>} A promise that resolves to the current path.
     * @throws {Error} If the route is not found or an error occurs during navigation.
     */
    init(): Promise<string>;
}
export {};
