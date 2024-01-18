"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penrose_paradox_1 = __importDefault(require("penrose-paradox"));
// Define the MessageContainer component.
// This component will be used to show the message when the button is clicked by subscribing to the "button-clicked" event.
function MessageContainer(props = {}) {
    const { callback = null } = props;
    let count = 0;
    const subscribe = penrose_paradox_1.default.pubsub.subscribe("button-clicked", callback ? callback : (message) => {
        const messageContainer = document.getElementById("messageContainer");
        messageContainer.innerHTML = `${message} ${count}`;
        count++;
    });
    return {
        tag: "div",
        options: {
            id: "messageContainer",
        }
    };
}
exports.default = MessageContainer;
