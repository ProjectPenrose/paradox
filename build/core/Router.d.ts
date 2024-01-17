/**
 * Represents a router that handles routing and navigation in a web application.
 */
export default class Router {
    routes: Array<any>;
    baseUrl: string;
    queryString: string;
    path: string;
    query: URLSearchParams;
    params: Map<string, string>;
    memo: {
        [key: string]: string;
    };
    /**
     * Creates a new instance of the Router class.
     * @param {Object} options - The options for configuring the router.
     * @param {Array} options.routes - An array of route objects.
     * @param {string} options.baseUrl - The base URL of the application.
     */
    constructor(options?: {
        routes?: any[];
        baseUrl?: string;
    });
    /**
     * Initializes the router and navigates to the appropriate route.
     * @returns {Promise<string>} A promise that resolves to the current path.
     * @throws {Error} If the route is not found or an error occurs during navigation.
     */
    init(): Promise<string>;
}
