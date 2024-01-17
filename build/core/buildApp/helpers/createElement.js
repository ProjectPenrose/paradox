"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName, options = { children: [], events: {}, attrs: {} }) {
    if (!tagName)
        throw new Error("tagName is required");
    let children = [];
    let events = {};
    let attrs = {};
    if (typeof options === 'object' && !Array.isArray(options) && 'children' in options) {
        children = options.children || [];
        events = options.events || {};
        attrs = options.attrs || {};
    }
    return {
        tagName,
        attrs,
        children,
        events,
    };
}
exports.default = createElement;
;
