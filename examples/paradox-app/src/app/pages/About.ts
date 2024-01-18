import Paradox from "penrose-paradox";
import { RouterProps } from "penrose-paradox/build/core/Router";
import { ParadoxElementOptions } from "penrose-paradox/build/core/buildElement/types";

// Import components
import Divider from "../components/Divider";
import Button from "../components/Button";
import MessageContainer from "../components/MessageContainer";

// Define the About component.
// This component will be rendered when the user navigates to the /about route.
export default function About(props: RouterProps = {}) {
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
          Divider() as { tag: string, options: ParadoxElementOptions },
          Button({ message: "About button clicked" }) as { tag: string, options: ParadoxElementOptions },
          MessageContainer() as { tag: string, options: ParadoxElementOptions },
        ]
      }
    )
  );
}