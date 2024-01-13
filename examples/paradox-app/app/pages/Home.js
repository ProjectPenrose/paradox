import Paradox from "../../../../build";

// Import components
import Divider from "../components/Divider";
import Button from "../components/Button";
import MessageContainer from "../components/MessageContainer";

function handleRemovePubsubSubscription() {
  const removed = Paradox.pubsub.unsubscribe("button-clicked");
  console.log(removed);
}

// Define the Home component.
// This component will be rendered when the user navigates to the / route.
export default function Home(props = {}) {
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
          {
            tag: "div",
            options: {
              classList: "d-flex align-items-center",
              children: [
                Button({ message: "Home button clicked" }),
                Button({ message: "Remove pubsub subscription clicked", text: "Remove pubsub subscription", onClick: handleRemovePubsubSubscription }),
              ]
            }
          },
          MessageContainer(),
        ]
      }
    )
  );
}