import Paradox from "penrose-paradox";
import { RouterOptions, RouteList, RouterProps } from "penrose-paradox/build/core/Router";

// Import pages
import Home from "./pages/Home"; 
import About from "./pages/About";
import Reactive from "./pages/Reactive";

const baseUrl: string = process.env.PUBLIC_URL || ""; // This is the url of the client app and it is used to redirect the user to the appropriate route.
const root: HTMLElement | null = document.querySelector("#root"); // This is the root element where the app will be rendered.
// Define the props that will be passed to each component.
// In this case, we are passing the root element to each component so that they can render themselves.
const props: RouterProps = { root };

// Define the routes for the app and their corresponding components.
const routes: RouteList = [
  {
    path: "/",
    component: Home,
    props
  },
  // {
  //   path: "/about",
  //   component: About,
  //   props
  // },
  // {
  //   path: "/reactive",
  //   component: Reactive
  // }
];

const routerProps: RouterOptions = {
  baseUrl,
  routes
};

// Create a new router instance.
const router = new Paradox.Router(routerProps);

// Initialize the router and navigate to the appropriate route.
router.init()
  .then((path) => console.info(`Navigated to ${path} 123`))
  .catch(error => console.error(error));

console.log("Hello world");
