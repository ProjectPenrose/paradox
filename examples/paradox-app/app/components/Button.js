import Paradox from "../../../../build";
// Define the Button component.
// This component will be used to publish a message when the button is clicked and show the function of the pubsub module.
export default function Button(props = {}) {
  function handleClick() {
    const { message } = props;
    Paradox.pubsub.publish("button-clicked", message);
  }

  const { text = "Write message", onClick = handleClick } = props;

  return {
    tag: "button",
    options: {
      text: text,
      events: {
        click: onClick
      }
    }
  }
}