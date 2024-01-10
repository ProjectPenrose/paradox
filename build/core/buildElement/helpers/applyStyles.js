"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStyleKey_1 = __importDefault(require("./getStyleKey"));
function applyStyles(element, style) {
    const styleDeclaration = element.style;
    // Apply inline style to the element by converting keys from camelCase
    for (const [key, value] of Object.entries(style)) {
        const styleKey = (0, getStyleKey_1.default)(key);
        styleDeclaration.setProperty(styleKey, value);
    }
}
exports.default = applyStyles;
