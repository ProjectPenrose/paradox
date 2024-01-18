import Paradox from "penrose-paradox";

// Import components
import Divider from "../components/Divider";
import Button from "../components/Button";
import MessageContainer from "../components/MessageContainer";

// Define the Home component.
// This component will be rendered when the user navigates to the / route.
export default function Home(props = {}) {
  const { root } = props;

  let count = 0;
  function handlePubsubSubscription(message) {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = `${message} ${count}`;
    count++;
  }

  function handleRemovePubsubSubscription() {
    Paradox.pubsub.unsubscribe("button-clicked", handlePubsubSubscription);
  }

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
                Button({ message: "Add pubsub subscription clicked again", text: "Add pubsub subscription", onClick: () => Paradox.pubsub.subscribe("button-clicked", handlePubsubSubscription) }),
              ]
            }
          },
          MessageContainer({ callback: handlePubsubSubscription }),
        ]
      }
    )
  );
}