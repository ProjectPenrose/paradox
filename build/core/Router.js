"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a router that handles routing and navigation in a web application.
 */
class Router {
    /**
     * Creates a new instance of the Router class.
     * @param {Object} options - The options for configuring the router.
     * @param {Array} options.routes - An array of route objects.
     * @param {string} options.baseUrl - The base URL of the application.
     */
    constructor(options = {}) {
        const { routes = [], baseUrl = "" } = options;
        this.routes = routes.map(route => (Object.assign(Object.assign({}, route), { pathSegments: route.path.split("/") })));
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let { path } = this;
            const { routes, queryString } = this;
            if (path.includes("#"))
                path = path.split("#")[0];
            if (this.memo[path])
                return this.memo[path];
            const pathSegments = path.split("/");
            const matchedRoute = routes.find(({ pathSegments: routePathSegments }) => {
                if (routePathSegments.length !== pathSegments.length) {
                    return false;
                }
                for (let i = 0; i < routePathSegments.length; i++) {
                    const routeSegment = routePathSegments[i];
                    const pathSegment = pathSegments[i];
                    if (!routeSegment.startsWith(":") && routeSegment !== pathSegment) {
                        return false;
                    }
                    else if (routeSegment.startsWith(":")) {
                        this.params.set(routeSegment.slice(1), pathSegment);
                    }
                }
                return true;
            });
            if (matchedRoute) {
                try {
                    matchedRoute.props = Object.assign(Object.assign({}, matchedRoute.props), { queryString, params: this.params, baseUrl: this.baseUrl });
                    if (matchedRoute.layout && typeof matchedRoute.layout === "function") {
                        // Pass the component and its props to the layout
                        yield matchedRoute.layout(matchedRoute.component, matchedRoute.props);
                    }
                    else if (matchedRoute.component && typeof matchedRoute.component === "function") {
                        yield matchedRoute.component(matchedRoute.props || {});
                    }
                    else {
                        throw new Error("Route component or layout not found");
                    }
                    this.memo[path] = path;
                    return path;
                }
                catch (error) {
                    throw new Error(String(error));
                }
            }
            else {
                throw new Error(`Route ${path} not found`);
            }
        });
    }
}
exports.default = Router;
