const fs = require("fs");
const path = require("path");

// check if app folder exists. If not, create it.
if (!fs.existsSync(path.join(__dirname, "app"))) {
  fs.mkdirSync(path.join(__dirname, "app"), { recursive: true });

  // create app.js
  fs.writeFileSync(
    path.join(__dirname, "app", "app.js"),
    `import Paradox from "../build"; // Import the Paradox module.

    const baseUrl = "http://127.0.0.1:3040"; // This is the url of the client app and it is used to redirect the user to the appropriate route.
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
      .then((path) => console.info(\`Navigated to ${path}\`))
      .catch(error => console.error(error));
    `
  );

  // create index.html
  fs.writeFileSync(
    path.join(__dirname, "app", "index.html"),
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Paradox</title>
        <link rel="stylesheet" href="http://127.0.0.1:3040/static/css/style.css">
    </head>
    <body>
        <div id="root"></div>
        <script src="http://127.0.0.1:3040/static/js/main.js"></script>
    </body>
    </html>
    `
  );
}

// check if server folder exists. If not, create it.
if (!fs.existsSync(path.join(__dirname, "server"))) {
  fs.mkdirSync(path.join(__dirname, "server"), { recursive: true });

  // create index.js
  fs.writeFileSync(
    path.join(__dirname, "server", "index.js"),
    `"use-strict";

    require("dotenv").config()
    
    const express = require("express");
    const path = require("path");
    
    const app = express();
    
    app.use(express.static("dist"));
    app.use("/static", express.static(path.join(__dirname, "../dist")));
    
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../app", "index.html"))
    })
    
    const PORT = process.env.PORT || 3040;
    
    app.listen(PORT, () => {
      console.log(\`App up and runing on PORT http://127.0.0.1:${PORT}\`);
    });
    `
  );
}

// check if scss folder exists. If not, create it.
if (!fs.existsSync(path.join(__dirname, "scss"))) {
  fs.mkdirSync(path.join(__dirname, "scss"), { recursive: true });

  // create style.scss
  fs.writeFileSync(
    path.join(__dirname, "scss", "main.scss"),
    `$enable-responsive-font-sizes: true;
    $enable-gradients: true;
    $enable-shadows: true;
    
    @import "../node_modules/bootstrap/scss/bootstrap.scss";
    
    html, body {
        height: 100%;
    }
    `
  );
}

// check if webpack.config.js exists. If not, create it.
if (!fs.existsSync(path.join(__dirname, "webpack.config.js"))) {
  fs.writeFileSync(
    path.join(__dirname, "webpack.config.js"),
    `const path = require("path")

    const TersePlugin = require("terser-webpack-plugin");
    
    const env = process.env.env || "development"
    
    module.exports = {
      entry: './app/main.js',
      target: "web",
      mode: env,
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js')
      },
      devtool: 'eval-source-map',
      devServer: {
        port: 3040,
        hot: false,
        liveReload: true,
        static: { 
          directory: './dist',
          watch: true
        },
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TersePlugin({
            include: /\.min\.js$/,
          }),
        ],
        splitChunks: {
          chunks: "all",
          name: "common",
        },
      },
      plugins: [],
      stats: {
        children: true,
        errorDetails: true,
      },
    };`
  );
}