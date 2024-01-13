# Examples

Here are some examples of how to use the Penrose Paradox. It'd hopefully help you understand how to use it and geive you some ideas on how to improve it.

## Table of contents

- [Understanding the Penrose Paradox](#understanding-the-penrose-paradox)
    - [Routes with Paradox.Router](#routes-with-paradoxrouter)
    - [Pubsub with Paradox.pubsub](#pubsub-with-paradoxpubsub)
    - [Paradox.buildElement](#paradoxbuildelement)
- [Paradox App](#paradox-app)

## Understanding the Penrose Paradox

Penrose Paradox is a set of tools to help you build web apps. It's not a framework, it's a small library that you can use to build simple web apps or complex web components in a modular way.

The Penrose Paradox library is composed of three main tools: `Paradox.Router`, `Paradox.pubsub`, and `Paradox.buildElement`. You can use them together or separately to build whatever you are trying to build.

Let's take a look at each one of them.

### Routes with `Paradox.Router`

`Paradox.Router` is a simple router that you can use to create routes in your app. It's not a full featured router, and it doesn't have support for SPA (Single Page Applications) out of the box yet. It doen't mean you can use it thoght.

Sometimes we are going to need to create a simple web app that doesn't need a SPA or that needs to be SEO friendly, and that's where `Paradox.Router` comes in handy because it's going to allow you modularize your app executing different components depending on the route.

`Paradox.Router` is a class and its constructor takes an options object as a parameter, which can have `routes` and `baseUrl` properties. The routes property is an array of route objects, and the baseUrl property is a string. If these properties are not provided, they default to an empty array and an empty string, respectively but it won't be very useful without them xD.

```js
import { Router } from "penrose-paradox";

// Import the component wrapper for your pages
import { Home, About, Contact } from "./pages.js";

// What's your base url?
const baseUrl = proces.env.BASE_URL || document.querySelector("base")?.href || "https://example.com";

// Define the routes
const routes = {
    "/": {
        path: "/", // The path of the route. required
        component: Home, // The component that will be execute when the route is matched. required
    },
    "/about": {
        path: "/about",
        component: About,
    },
    "/contact": {
        path: "/contact",
        component: Contact,
    },
    "dashboard": {
        path: "/dashboard",
        layout: DashboardLayout, // The layout that will be used for the route
        component: Dashboard, // The component that will be execute when the route is matched
        props: {
            token: localStorage.getItem("token"),
        }
    },
};

// Create the router
const router = new Router({ routes, baseUrl });
```

So, `baseUrl` is important because it's the base url of your app. It's the url that will be used to create the links in your app. For example, if your base url is `https://example.com`, and you have a route with the path `/about`, the link to that route will be `https://example.com/about` so `Paraodx.Router` will execute the `About` component when the user navigates to that url.

In the case of the `routes` property, it's an object with the routes of your app. Each route is an object with the following properties:

- `path`: This is the path of the route. It's required.
- `component`: This is the component that will be executed when the route is matched. It's required. Take this as the main function taht will be executed when the route is matched, it can contain other functions and components, but it's the main function that will be executed. It's required if there's no `layout` function.
- `layout`: This is the layout that will be used for the route. It's optional. If you don't provide a layout, the component will be executed without a layout. Otherwise, the component will be executed inside the layout.
- `props`: This is an object with the props that will be passed to the main component. It's optional.

Now, what properties can you use in the `router` object?

`routes`: An array of route objects. Each route object is expected to have a path property, which is split into segments and stored in the `pathSegments` property of the route object.
`baseUrl`: The base URL of the application.
`queryString`: The query string of the current URL.
`path`: The path of the current URL, derived by removing the baseUrl and queryString from the current URL.
`query`: An instance of `URLSearchParams` initialized with the query string of the current URL.
`params`: A `Map` that will be used to store route parameters.
`memo`: An object that will be used to store the paths that have been navigated to. **This doesn't do anything yet, but it will be used in the future.**

After you create the router, you need to initialize it. To do so, you need to call the `init` method of the router.

```js
// ...

// Initialize the router

router.init();
```

The `init` method of the `Router` class is used to initialize the router and navigate to the appropriate route based on the current URL. It first checks if the current path is stored in memo. If it is, it returns the path. Otherwise, it finds a route that matches the current path.

If a matching route is found, it checks if the route has a layout function or a component function. If the route has a layout function, it calls this function with the component and props of the route.

If the route doesn't have a layout function but has a component function, it calls this function with the props of the route. If the route doesn't have either a layout or a component function, it throws an error. If a matching route is not found, it throws an error

The `init` method is asynchronous, so you can call it with the `await` keyword or use the `then` and `catch` methods.

```js
// ...

// Initialize the router
router.init()
    .then(() => {
        // Do something after the router is initialized and all the components are executed
        // meaning that the app is ready
    })
    .catch((error) => {
        // Do something if the router fails to initialize
    });

// OR
(async () => {
    try {
        await router.init();
        // Do something after the router is initialized
    } catch (error) {
        // Do something if the router fails to initialize
    }
})();

```

### Pubsub with Paradox.pubsub

`Paradox.pubsub` is a simple pubsub implementation that you can use to create events in your app. It's not a full featured pubsub implementation, but it's enough for most use cases and it'll be improved in the future.

In case you doón know, Pubsub is a pattern that allows you to create events in your app. You can subscribe to an event and execute a function when the event is published. You can also unsubscribe from an event. Something similar to what you can do with `addEventListener` and `removeEventListener` but with more flexibility.

`Paradox.pubsub` is an instance of the `PubSub` class and it has a single property, `events`, which is an object where the keys are event names and the values are sets of callback functions. This structure is defined by the `EventMap` type.

**The constructor of the `PubSub`** class initializes the events property as an empty object.

The `subscribe` method allows a callback function to subscribe to a specific event. If the event does not exist yet in the events object, it is added with an empty set of callbacks. Then, the callback is added to the set of callbacks for the event.

The `unsubscribe` method allows a callback function to unsubscribe from a specific event. If the event exists in the events object, the callback is removed from the set of callbacks for the event. **This won't work if the callback is an anonymous function.**

The `publish` method allows an event to be published with some data. All the callbacks subscribed to the event are executed with the data. The return values of the callbacks are collected into an array and returned. If any callback throws an error, it is caught and null is added to the array of return values instead. **The method also supports a special event, "*"**, which is published every time any event is published. This is useful for logging and debugging purposes.

The `EventCallback` type is a function type that takes a single argument, data, and does not return anything. This type is used to type the callback functions that can subscribe to events.

**Finally, an instance of the `PubSub` class is created and exported as the default export of the module. This allows other modules in the project to import and use the same instance of the PubSub class, effectively creating a global event bus.**

```js
import { pubsub } from "penrose-paradox";

// Subscribe to all events
Pubsub.subscribe("*", (data) => {
    console.log(`Event ${data.event} was published with data: ${data.data}`);
});

// Subscribe to an event with an anonymous function
pubsub.subscribe("event-name", (data) => {
    // Do something with the data
    // As this is an anonymous function, it can't be unsubscribed
});

// Publish an event
pubsub.publish("event-name", { foo: "bar" });

// Subscribe to an event with a named function
function callback(data) {
    // Do something with the data
    // This function can be unsubscribed
}
Pubsub.subscribe("event-name-2", callback);

// Publish an event
pubsub.publish("event-name-2", { foo: "bar" });

// Unsubscribe from an event
pubsub.unsubscribe("event-name-2", callback);

// At this point, the callback function won't be executed when the event is published again
```

### Creating DOM elements with `Paradox.buildElement`

`Paradox.buildElement` is a function that you can use to create DOM elements. It's not a full featured function, but it's enough for most use cases and it'll be improved in the future.

In order to use `Paradox.buildElement`, you need to create a virtual DOM tree. A virtual DOM tree is an object that represents a DOM tree. Something similar to how React works under the hood.

The virtual DOM tree is an object with the following properties:

- `tag`: The tag name of the element.
- `options`: An object with the options of the element.
    - `id`: The id of the element.
    - `classList`: A string of space-separated class names.
    - `attributes`: An object with the attributes of the element.
    - `text`: The text content of the element.
    - `style`: An object with the style properties of the element.
    - `children`: An array of virtual DOM trees.
    - `events`: An object with the event listeners of the element.

**The `tag` property is a string that represents the tag name of the element. It can be any valid HTML tag name, such as `div`, `span`, `p`, `a`, `button`, `input`, `img`, etc.**

Let's take a look at an example:

```js
import { buildElement } from "penrose-paradox";

function handleClick(event) {
    console.log("The button was clicked!");
}

const virtualDOM = {
    tag: "div",
    options: {
        id: "my-div",
        classList: "my-class-1 my-class-2",
        attributes: {
            "data-foo": "bar",
        },
        text: "Hello world!",
        style: {
            color: "red",
            backgroundColor: "blue",
        },
        children: [
            {
                tag: "span",
                options: {
                    text: "Hello world!",
                },
            },
            {
                tag: "button",
                options: {
                    events: {
                        click: handleClick,
                    },
                    text: "Click me!",
                },
            },
        ],
    },
};

// Create the element
const element = buildElement(virtualDOM.tag, virtualDOM.options);

// Append the element to the DOM
const root = document.getElementById("root");
root.appendChild(element);
```

What this will do is create a `div` element with the passed attributes (ioncluding id and classes) and then, recursively, create the children elements.

## Paradox App

The Paradox App is a sample app that uses the Penrose Paradox library and its trhee main tools create a simple app with a navigation bar and a main content area.

### Requirements

- [Node.js](https://nodejs.org/en/) >= v18.17.1 (For development mode)

### Installation

```bash
# Navigate to the example folder
cd examples/paradox-app

# Install the dependencies
npm install
```

### Folder structure

```bash
. # Root
├── app
│   ├── components # Things like buttons, inputs, etc.
│   │   ├── Button.js
│   │   ├── Divider.js
│   │   └── MessageContainer.js
│   │── pages # Pages folder (Wrapper components for Home and About pages)
│   │   ├── About.js
│   │   ├── Home.js
│   ├── main.js # Entry point
│   └── index.html
├── dist
│   ├── css
│   │   ├── style.css
│   │   └── style.css.map
│   ├── js
│   │   ├── main.js # Compiled JavaScript
├── node_modules
├── scss
│   ├── main.scss
├── server
│   ├── index.js
│   package-lock.json
├── package.json
├── webpack.config.js
```

### Usage

```bash
# Run the app in development mode
npm run dev
```

After running the command, open your browser and navigate to `http://localhost:3040`. You should see the app running.

It's pretty simple, but it's a good example of how to use the Penrose Paradox library. In the home page you will find the following features:

- A navigation bar with a link to the about page
- Three buttons:
    - One to write a message to the message container that uses `Paradox.pubsub` to publish the `message` event
    - One to unsubscribe from the `message` event that when clicked, you won't be able to write messages to the message container
    - One to subscribe again to the `message` event that when clicked, you will be able to write messages to the message container again
- Each time you write a message to the message container, a counter will be incremented and the message will be displayed in the message container

In the about page you will find the following features:

- A navigation bar with a link to the home page
- A button to navigate to the home page
- A button to wwrite the message with the counter to the message container. Same as the home page, but this time, the message will be displayed in the about page

## Under the hood

### Server

As I said before, the Penrose Paradox library can be use to build simple web apps that don't need a SPA or that need to be SEO friendly. That's the reason why, in this example, the app is running on a Node.js server.

The server is a simple Express server that serves the static files of the app and redirects all the requests to the `index.html` file. This is done to allow the app to handle the routes.

### Sass and Bootstrap

The app uses Sass and Bootstrap to style the app. The Sass files are located in the `scss` folder and the compiled CSS files are located in the `dist/css` folder.

### Webpack

The app uses Webpack to bundle the JavaScript files. The entry point is the `app/main.js` file and the compiled JavaScript file is located in the `dist/js` folder.

### The app

The app is located in the `app` folder and it's composed of the following files:

#### `app/main.js`

- Imports the `Router` class from the Penrose Paradox library
- Imports the `Home` and `About` components from the `pages` folder
- Declares the `baseUrl` using the `BASE_URL` environment variable or the `href` attribute of the `base` tag or a default value
- Gets the `#root` element from the DOM and stores it in a variable called `root`
- Defines the `props` object and adds the `root` property with the `root` element to it
- Defines the `routes` object with the routes of the app
- Creates a new instance of the `Router` class with the `routes` and `baseUrl` properties
- Initializes the router

#### `app/pages/Home.js`

- Imports the `buildElement` and `pubsub` from the Penrose Paradox library
- Imports the `Button`, `Divider` and `MessageContainer` components from the `components` folder
- Defines the `Home` component as a function that takes the `props` object as a parameter
    - Extracts the `root` property from the `props` object and stores it in a variable called `root`
    - Declares the counter variable as `count` with an initial value of `0`
    - Defines the subscription Handler as `handlePubsubSubscription`
        - It takes the `data` argument which is the message that was published
        - Selects the `messageContainer` element from the DOM and stores it in a variable called `messageContainer`
        - Adds the `message` and the `count` to the `messageContainer` element
        - Increments the `count` variable
    - Defines the `handleRemovePubsubSubscription` function
        - Uses the `pubsub.unsubscribe` method to unsubscribe the `handlePubsubSubscription` function from the `message` event
    - Appends to the `root` element, the returned value from `buildEelment` passing a `div` tag and a DOM tree that represents the page structure
        - You will see in the the DOM tree, the compments that are used to build the page
            - `Divider` will return a `hr` DOM tree
            - `Button` will return a `button` DOM tree and will take the following props:
                - `maeesage`: The message that will be published when the button is clicked
                - `text`: The text that will be displayed in the button
                - `onClick`: The function that will be executed when the button is clicked
                - So, what `Button` does is:
                    - Import the `pubsub` from the Penrose Paradox library
                    - Defines the component as a function that takes the `props` object as a parameter
                        - Declares the click handler as `handleClick`
                            - Extracts the `message` property from the `props` object and stores it in a variable called `message`
                            - Uses the `pubsub.publish` method to publish the `message` event with the `message` prop as the data
                        - Extracts the `text` and `onClick` properties from the `props` object and stores them in variables called `text` and `onClick`, respectively. If the `onClick` property is not provided, it defaults to the `handleClick` function
                        - Returns the DOM tree that represents the button adding the `text` and the `onClick` properties to the `options` object

Now, when you click the first button in the home page, the `handleClick` function will be executed and the `message` event will be published with the `message` prop as the data. This happens beacause we are not passing the `onClick` prop to the first `Button` component, so it defaults to the `handleClick` function.

Then, if you click the second button, it will execute the `handleRemovePubsubSubscription` we defined in the `Home` component beacause we are passing the `onClick` prop to the second `Button` component. **Now you won't be able to write messages to the message container.**

Finally, if you click the third button, it will execute the `handlePubsubSubscription` function we defined in the `Home` component beacause we are passing the `onClick` prop to the third `Button` component. **Now you will be able to write messages to the message container again.**


#### `app/pages/About.js`

If you understood the `Home` component, you will understand the `About` component because it's reusing the same components and have a simpler functionality.

