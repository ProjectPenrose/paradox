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
// Define the About component.
// This component will be rendered when the user navigates to the /about route.
function About(props = {}) {
    const { root } = props;
    root.append(penrose_paradox_1.default.buildElement("div", {
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
            (0, Divider_1.default)(),
            (0, Button_1.default)({ message: "About button clicked" }),
            (0, MessageContainer_1.default)()
        ]
    }));
}
exports.default = About;
