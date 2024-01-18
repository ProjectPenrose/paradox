import Paradox from "penrose-paradox";

// Import pages
import Home from "./pages/Home"; 
import About from "./pages/About";
import Reactive from "./pages/Reactive";

const baseUrl: string = process.env.PUBLIC_URL || ""; // This is the url of the client app and it is used to redirect the user to the appropriate route.
const root: HTMLElement | null = document.querySelector("#root"); // This is the root element where the app will be rendered.
// Define the props that will be passed to each component.
// In this case, we are passing the root element to each component so that they can render themselves.
const props: object = { root };

// Define the routes for the app and their corresponding components.
const routes: Array<object> = [
  {
    path: "/",
    component: Home,
    props
  },
  {
    path: "/about",
    component: About,
    props
  },
  {
    path: "/reactive",
    component: Reactive
  }
];

// Create a new router instance.
const router = new Paradox.Router({ routes, baseUrl });

// Initialize the router and navigate to the appropriate route.
router.init()
  .then((path) => console.info(`Navigated to ${path}`))
  .catch(error => console.error(error));
