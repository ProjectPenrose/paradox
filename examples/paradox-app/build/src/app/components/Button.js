"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penrose_paradox_1 = __importDefault(require("penrose-paradox"));
// Define the Button component.
// This component will be used to publish a message when the button is clicked and show the function of the pubsub module.
function Button(props = {}) {
    function handleClick() {
        const { message } = props;
        penrose_paradox_1.default.pubsub.publish("button-clicked", { message });
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
    };
}
exports.default = Button;
