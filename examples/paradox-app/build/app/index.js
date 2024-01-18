"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penrose_paradox_1 = __importDefault(require("penrose-paradox"));
// Import pages
const Home_1 = __importDefault(require("./pages/Home"));
const About_1 = __importDefault(require("./pages/About"));
const Reactive_1 = __importDefault(require("./pages/Reactive"));
const baseUrl = process.env.PUBLIC_URL || ""; // This is the url of the client app and it is used to redirect the user to the appropriate route.
const root = document.querySelector("#root"); // This is the root element where the app will be rendered.
// Define the props that will be passed to each component.
// In this case, we are passing the root element to each component so that they can render themselves.
const props = { root };
// Define the routes for the app and their corresponding components.
const routes = [
    {
        path: "/",
        component: Home_1.default,
        props
    },
    {
        path: "/about",
        component: About_1.default,
        props
    },
    {
        path: "/reactive",
        component: Reactive_1.default
    }
];
// Create a new router instance.
const router = new penrose_paradox_1.default.Router({ routes, baseUrl });
// Initialize the router and navigate to the appropriate route.
router.init()
    .then((path) => console.info(`Navigated to ${path}`))
    .catch(error => console.error(error));
