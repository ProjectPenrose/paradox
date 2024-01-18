import Paradox from "penrose-paradox";
import { ParadoxElementOptions } from "penrose-paradox/build/core/buildElement/types";
import { RouterProps } from "penrose-paradox/build/core/Router";

// Import components
import Divider from "../components/Divider";
import Button from "../components/Button";
import MessageContainer from "../components/MessageContainer";

// Define the Home component.
// This component will be rendered when the user navigates to the / route.
export default function Home(props: RouterProps = {}) {
  const { root } = props;

  let count = 0;
  function handlePubsubSubscription(message: string) {
    const messageContainer: HTMLElement | null = document.getElementById("messageContainer");
    if (!messageContainer) return;
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
          Divider() as { tag: string, options: ParadoxElementOptions },
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
          MessageContainer({ callback: handlePubsubSubscription }) as { tag: string, options: ParadoxElementOptions },
        ]
      }
    )
  );
}