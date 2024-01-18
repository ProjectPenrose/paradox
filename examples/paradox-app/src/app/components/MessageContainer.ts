import Paradox from "penrose-paradox";

// Define the MessageContainer component.
// This component will be used to show the message when the button is clicked by subscribing to the "button-clicked" event.
export default function MessageContainer(props = {}) {
  const { callback = null } = props;
  let count = 0;
  const subscribe = Paradox.pubsub.subscribe("button-clicked", callback ? callback : (message) => {
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