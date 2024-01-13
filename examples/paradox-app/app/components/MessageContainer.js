import Paradox from "../../../../build";

// Define the MessageContainer component.
// This component will be used to show the message when the button is clicked by subscribing to the "button-clicked" event.
export default function MessageContainer(props = {}) {
  let count = 0;
  Paradox.pubsub.subscribe("button-clicked", (message) => {
    const messageContainer = document.getElementById("messageContainer");
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