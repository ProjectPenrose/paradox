
<!-- PROJECT LOGO -->
<p align="center">
  <!-- <a href="#">
    <img src="http://unizend.com/images/unizend-logo.svg" alt="<Paradox/>" width="200" height="80">
  </a> -->

  <h1 align="center">&lt;Paradox/&gt; Not another javascript framework!</h1>

  <p align="center">
    Paradox is just a simple vanilla javascript library for DOM manipulation.
    <br>
    Hopefully it will ease your development while learning
    <br />
    ·
    <a href="https://github.com/ProjectPenrose/paradox/labels/bug">Report Bugs</a>
    ·
    <a href="https://github.com/ProjectPenrose/paradox/labels/enhancement">Request Features</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Installation](#installation)
* [Usage](#usage)
  * [Paraodx as a module](#paraodx-as-a-module)
  * [Paraodx as a module in a simple html project](#paraodx-as-a-module-in-a-simple-html-project)
  * [Paraodx on development mode](#paraodx-on-development-mode)
* [Documentation](#documentation)
  * [Build an element with `Paradox.buildElement`](#build-an-element-with-paradoxbuildelement)
  * [Router with `Paradox.Router`](#router-with-paradoxrouter)
  * [PubSub with `Paradox.pubsub`](#pubsub-with-paradoxpubsub)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Roadmap](#roadmap)
* [Acknowledgements](#acknowledgements)

<br />
<hr />
<br />

## About The Project

Working on cool stuff to say here. stay tuned and please be patient, this is a work in progress.

Contributions are welcome thogh xd, please [start a discussion](https://github.com/ProjectPenrose/paradox/discussions/categories/ideas) to discuss what you would like to change, add or remove and we can figure it out together.

<br />
<hr />
<br />

## Getting Started

Paradox is a simple vanilla javascript library for DOM manipulation that also provides a simple router and pubsub implementation.

### Requirements

- [Node.js](https://nodejs.org/en/) >= v18.17.1

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:ProjectPenrose/paradox.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```

<br />
<hr />
<br />

## Usage

Now things can change depending on what you want to do, so here are some options:

### Paraodx as a module

If you want to use it as a module in a project that uses webpack or something similar, you can just import it like this:
```javascript
import Paradox from "path/to/paradox/src";
```
**Note: It'll be soon available as a package in npm so this will change.**

### Paraodx as a module in a simple html project

If you want to use it as a module in a simple html project, you should import it in your script like this:

```html
<script type="module">
  import Paradox from "path/to/paradox/src/index.js";
</script>
```

### Paraodx on development mode

If you want to build a project that uses paradox, you can run the build script:
```sh
npm run paradox-app
```
**This will generate the following:**
- A `server` folder with a simple express server that serves the `dist` folder and redirects all the requests to the `index.html` file.
- A `scss` folder with a simple `main.scss` file that imports bootstrap.
- An `app` folder with a simple html project that uses paradox and a `main.js` file that imports paradox and shows a simple example of how to use it.
- A `webpack.config.js` file that you can use to build your project.

Then, the script will run the dev script, so you can start developing your project by changing the `app` folder and running the dev script again.
**This will generate a `dist` folder with the built project.**

**Notes:**
- The `server` folder is just a simple example, you can delete it and create your own server.
- The `scss` folder is just a simple example, you can delete it and create your own scss files.
- The `app` folder is just a simple example, you can delete it and create your own project.
- The `webpack.config.js` file is just a simple example, you can delete it and create your own webpack config file.
- The `dist` folder will contain the javascript bundle and a css file with the styles. (The css file is generated from the `scss/main.scss` file)

<br />
<hr />
<br />

## Documentation

Paradox includes the following features:

### Build an element with `Paradox.buildElement`

Paradox provides a simple way to build an element with the `buildElement` function that takes the element name and an object with the element properties as arguments.

**Properties:**

| Property | Type | Description |
| --- | --- | --- |
| id | string | The element id |
| classList | string | The element class list separated by spaces |
| attributes | object | The element attributes (e.g. type, value, etc.) |
| events | object | The element events (e.g. click, change, etc.) |
| style | object | The element style (e.g. backgroundColor, color, etc.) |
| text | string | The element text |
| children | array | The element children |

```javascript
import Paradox from "paradox";

function handleButtonClick() {
  alert("Hello World!");
}

const myButton = {
  id: "myButton",
  classList: "btn btn-primary",
  attributes: {
    type: "button",
  },
  events: {
    click: handleButtonClick,
  },
  style: {
    backgroundColor: "red",
  },
  text: "Click me!",
  children: [
    {
      tag: "i",
      options: {
        id: "myButtonIcon",
        classList: "fas fa-hand-pointer",
      }
    },
  ],
}

document.body.appendChild(Paradox.buildElement("button", myButton));
```

**NOTES:**
- The `buildElement` function will return a `HTMLElement` object.
- The `children` property is an array of objects with the `tag` and `options` properties. The `tag` property is the element name and the `options` property is the object with the element properties.
- The `options` property is optional, so you can pass just the `tag` property and it will return an element with no properties.

### Route with `Paradox.Router`

Paradox provides a simple router to handle the navigation between pages.

```javascript
import Paradox from "paradox";

function Home(props) {
  const { root } = props;
  root.append(Paradox.buildElement("div", {
    id: "home",
    text: "Welcome to Paradox!",
  }));
}

function About(props) {
  const { name, root } = props;
  root.append(Paradox.buildElement("div", {
    id: "about",
    text: `Paraodx is a simple vanilla javascript library for DOM manipulation. This is the ${name} page.`,
  }));
}

const root = document.getElementById("root");

const routes = [
  {
    path: "/",
    component: Home,
    props: {
      root,
    },
  },
  {
    path: "/about",
    component: About,
    props: {
      name: "About",
      root,
    },
  },
];

const router = new Paradox.Router(routes);
router.init()
  .then((path) => {
    console.info(`The current path is: ${path}`);
  })
  .catch((error) => {
    console.error(error);
  });
```

**NOTES:**
- The router will look for the `#` in the url to handle the navigation. For example, if the url is `http://localhost:8080/#/about`, the router will navigate to the `/about` path.
- The router will inject the `props` object into the component function as an argument and it will contain, besides the properties that you pass, the following properties:
  - `queryString`: A string with the query parameters. For example, if the url is `http://localhost:8080/about?name=Paradox`, the `queryString` will be `?name=Paradox`.
  - `params`: An object with the path parameters. For example, if the url is `http://localhost:8080/about/Paradox`, and the path is `/about/:name`, the `params` object will be `{ name: "Paradox" }`.
  - `query`: An object with the query parameters. For example, if the url is `http://localhost:8080/about?name=Paradox`, the `query` object will be `{ name: "Paradox" }`.
  - `baseUrl`: A string with the base url. For example, if the url is `http://localhost:8080/about?name=Paradox`, the `baseUrl` will be `http://localhost:8080`.

### PubSub with `Paradox.pubsub`

Paradox provides a simple PubSub implementation to handle the communication between components.

In case you're not familiar, PubSub is a popular messaging pattern in software architecture. It stands for Publish-Subscribe pattern and is used for communication between different parts of an application or between different applications.

In the PubSub pattern, publishers send messages without knowing who the subscribers are. Subscribers, on the other hand, express interest in one or more events and only receive messages that are of interest, without knowing who sent them.

This pattern is widely used in event-driven programming and can help to decouple the components of an application, leading to code that is easier to maintain and extend. In the context of Paradox, it allows components to communicate with each other in a decoupled manner.

```javascript
import Paradox from "paradox";

Paradox.pubsub.subscribe("myEvent", (data) => {
  console.log(data);
});

Paradox.pubsub.publish("myEvent", "Hello World!");
```

**NOTES:**
- You can use pubsub to communicate between components, for example, you can publish an event in a component and subscribe to it in another component. This way you can pass data between components without having to use props.
- Subscriptions are not persistent, so if you subscribe to an event and then navigate to another page, the subscription will be lost.
- You can use the `Paradox.pubsub.unsubscribe` method to unsubscribe from an event.
- You can not publish an event before subscribing to it xd.

<br />
<hr />
<br />

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

<br />
<hr />
<br />

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/ProjectPenrose/paradox?tab=MIT-1-ov-file) for more information.

<br />
<hr />
<br />

## Contact

Santiago Rincon - [@alexsc6955](https://linkedin.com/in/alexsc6955)

## Roadmap

See the [open issues](https://github.com/ProjectPenrose/paradox/issues) for a list of proposed features (and known issues).

<br />
<hr />
<br />

## Acknowledgements

* [K2](https://github.com/k2con) - For not letting me use React in their projects xd.
