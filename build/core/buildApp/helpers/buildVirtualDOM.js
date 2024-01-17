"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createElement_1 = __importDefault(require("./createElement"));
function buildVirtualDOM(vTree) {
    let vDOM = [];
    if (!Array.isArray(vTree))
        vTree = [vTree];
    for (const elementObj of vTree) {
        let elementObject = elementObj;
        if (typeof elementObj === "function")
            elementObject = elementObj();
        if (typeof elementObject === "string") {
            vDOM.push(elementObject);
            continue;
        }
        for (const [key, value] of Object.entries(elementObject)) {
            let { attrs = {}, events = {}, children = [] } = value;
            if (children.length) {
                children = buildVirtualDOM(children);
            }
            vDOM.push((0, createElement_1.default)(key, { attrs, events, children }));
        }
    }
    return vDOM;
}
exports.default = buildVirtualDOM;
