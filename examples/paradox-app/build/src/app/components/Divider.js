"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define the Divider component.
// This component will be used to separate the other components.
function Divider(props = {}) {
    return {
        tag: "hr",
        options: {
            classList: "my-4"
        }
    };
}
exports.default = Divider;
