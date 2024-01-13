import Paradox from "../../../../build";

// Define the MessageContainer component.
// This component will be used to show the message when the button is clicked by subscribing to the "button-clicked" event.
export default function MessageContainer(props = {}) {
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