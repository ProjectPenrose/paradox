import Paradox from "../../../build";



const baseUrl = "http://localhost:3040"; // This is the url of the client app and it is used to redirect the user to the appropriate route.
const root = document.querySelector("#root"); // This is the root element where the app will be rendered.

// Define the MessageContainer component.
// This component will be used to show the message when the button is clicked by subscribing to the "button-clicked" event.
function MessageContainer(props = {}) {
  Paradox.pubsub.subscribe("button-clicked", (message) => {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = message;
  });

  return {
    tag: "div",
    options: {
      id: "messageContainer",
    }
  }
}

// Define the Button component.
// This component will be used to publish a message when the button is clicked and show the function of the pubsub module.
function Button(props = {}) {
  function handleClick() {
    const { message } = props;
    Paradox.pubsub.publish("button-clicked", message);
  }
  return {
    tag: "button",
    options: {
      text: "Write message",
      events: {
        click: handleClick
      }
    }
  }
}

// Define the Divider component.
// This component will be used to separate the other components.
function Divider(props = {}) {
  return {
    tag: "hr",
    options: {
      classList: "my-4"
    }
  }
}

// Define the Home component.
// This component will be rendered when the user navigates to the / route.
function Home(props = {}) {
  const { root } = props;
  root.append(
    Paradox.buildElement(
      "div",
      {
        classList: "container",
        children: [
          {
            tag: "h1",
            options: {
              text: "Home"
            }
          },
          {
            tag: "a",
            options: {
              text: "Go to about",
              attributes: {
                href: "/about"
              }
            }
          },
          Divider(),
          Button({ message: "Home button clicked" }),
          MessageContainer()
        ]
      }
    )
  );
}

// Define the About component.
// This component will be rendered when the user navigates to the /about route.
function About(props = {}) {
  const { root } = props;
  root.append(
    Paradox.buildElement(
      "div",
      {
        classList: "container",
        children: [
          {
            tag: "h1",
            options: {
              text: "About"
            }
          },
          {
            tag: "a",
            options: {
              text: "Go to home",
              attributes: {
                href: "/"
              }
            }
          },
          Divider(),
          Button({ message: "About button clicked" }),
          MessageContainer()
        ]
      }
    )
  );
}

// Define the props that will be passed to each component.
// In this case, we are passing the root element to each component so that they can render themselves.
const props = { root };

// Define the routes for the app and their corresponding components.
const routes = [
  {
    path: "/",
    component: Home,
    props
  },
  {
    path: "/about",
    component: About,
    props
  }
];

// Create a new router instance.
const router = new Paradox.Router({ routes, baseUrl });

// Initialize the router and navigate to the appropriate route.
router.init()
  .then((path) => console.info(`Navigated to ${path}`))
  .catch(error => console.error(error));
