
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
* [Usage](#usage)

<br />
<hr />
<br />

<!-- ABOUT THE PROJECT -->
## About The Project

Working on cool stuff to say here. stay tuned and please be patient, this is a work in progress.

Contributions are welcome thogh xd, please [start a discussion](https://github.com/ProjectPenrose/paradox/discussions/categories/ideas) to discuss what you would like to change, add or remove and we can figure it out together.

<br />
<hr />
<br />

<!-- USAGE EXAMPLES -->
## Usage

### Build an element

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

### Router

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
    console.log(`The current path is: ${path}`);
  })
  .catch((error) => {
    console.error(error);
  });
```

**NOTES:**
- The router will look for the `#` in the url to handle the navigation. For example, if the url is `http://localhost:8080/#/about`, the router will navigate to the `/about` path.
- The router will inject the `props` object into the component function as an argument and it will contain the `params` and `query` objects.

### PubSub

Paradox provides a simple PubSub implementation to handle the communication between components.

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
