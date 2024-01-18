"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penrose_paradox_1 = __importDefault(require("penrose-paradox"));
// Import components
const Divider_1 = __importDefault(require("../components/Divider"));
const Button_1 = __importDefault(require("../components/Button"));
const MessageContainer_1 = __importDefault(require("../components/MessageContainer"));
// Define the Home component.
// This component will be rendered when the user navigates to the / route.
function Home(props = {}) {
    const { root } = props;
    let count = 0;
    function handlePubsubSubscription(message) {
        const messageContainer = document.getElementById("messageContainer");
        messageContainer.innerHTML = `${message} ${count}`;
        count++;
    }
    function handleRemovePubsubSubscription() {
        penrose_paradox_1.default.pubsub.unsubscribe("button-clicked", handlePubsubSubscription);
    }
    root.append(penrose_paradox_1.default.buildElement("div", {
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
            (0, Divider_1.default)(),
            {
                tag: "div",
                options: {
                    classList: "d-flex align-items-center",
                    children: [
                        (0, Button_1.default)({ message: "Home button clicked" }),
                        (0, Button_1.default)({ message: "Remove pubsub subscription clicked", text: "Remove pubsub subscription", onClick: handleRemovePubsubSubscription }),
                        (0, Button_1.default)({ message: "Add pubsub subscription clicked again", text: "Add pubsub subscription", onClick: () => penrose_paradox_1.default.pubsub.subscribe("button-clicked", handlePubsubSubscription) }),
                    ]
                }
            },
            (0, MessageContainer_1.default)({ callback: handlePubsubSubscription }),
        ]
    }));
}
exports.default = Home;
