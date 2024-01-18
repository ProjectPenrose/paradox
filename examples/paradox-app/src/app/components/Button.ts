import Paradox from "penrose-paradox";
import { RouterProps } from "penrose-paradox/build/core/Router";

// Define the Button component.
// This component will be used to publish a message when the button is clicked and show the function of the pubsub module.
export default function Button(props: RouterProps = {}) {
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