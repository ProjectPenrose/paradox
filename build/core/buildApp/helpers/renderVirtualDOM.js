"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTargetNodeCache = exports.targetNodeCache = void 0;
const render_1 = __importDefault(require("./render"));
const mount_1 = __importDefault(require("./mount"));
exports.targetNodeCache = document.body;
function setTargetNodeCache(targetNode) {
    exports.targetNodeCache = targetNode;
}
exports.setTargetNodeCache = setTargetNodeCache;
function renderVirtualDOM(vDOM, targetNode) {
    vDOM.forEach((vnode) => {
        const $node = (0, render_1.default)(vnode);
        exports.targetNodeCache = (0, mount_1.default)($node, targetNode);
    });
}
exports.default = renderVirtualDOM;
