"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderEle(vnode) {
    let { tagName, attrs, children, events } = vnode;
    const $el = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs)) {
        $el.setAttribute(key, value.toString());
    }
    for (const child of children) {
        const $child = render(child);
        $el.appendChild($child);
    }
    for (const [key, value] of Object.entries(events)) {
        if (Array.isArray(value)) {
            for (const event of value) {
                $el.addEventListener(key, event);
            }
            continue;
        }
        else {
            $el.addEventListener(key, value);
        }
    }
    return $el;
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
