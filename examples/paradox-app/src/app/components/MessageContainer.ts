import Paradox from "penrose-paradox";
import { RouterProps } from "penrose-paradox/build/core/Router";

// Define the MessageContainer component.
// This component will be used to show the message when the button is clicked by subscribing to the "button-clicked" event.
export default function MessageContainer(props: RouterProps = {}) {
  const { callback = null } = props;
  let count = 0;
  Paradox.pubsub.subscribe("button-clicked", callback ? callback : ({ message }) => {
    const messageContainer: HTMLElement | null = document.getElementById("messageContainer");
    if (!messageContainer) return;
    messageContainer.innerHTML = `${message} ${count}`;
    count++;
  });

  return {
    tag: "div",
    options: {
      id: "messageContainer",
    }
  }
}