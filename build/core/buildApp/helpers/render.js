"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderEle(vnode) {
    let tagName = "";
    let attrs = {};
    let children = [];
    let events = {};
    if (typeof vnode === "object") {
        tagName = vnode.tagName;
        attrs = vnode.attrs;
        children = vnode.children;
        events = vnode.events || {};
    }
    const element = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value.toString());
    }
    for (const child of children) {
        const $child = render(child);
        element.appendChild($child);
    }
    for (const [key, value] of Object.entries(events)) {
        if (Array.isArray(value)) {
            for (const event of value) {
                element.addEventListener(key, event);
            }
            continue;
        }
        else {
            element.addEventListener(key, value);
        }
    }
    return element;
}
;
function render(vnode) {
    if (typeof vnode === "string") {
        return document.createTextNode(vnode);
    }
    return renderEle(vnode);
}
exports.default = render;
;
