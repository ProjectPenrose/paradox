"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (tagName, options = { children: [], events: {}, attrs: {} }) => {
    if (!tagName)
        throw new Error("tagName is required");
    const { children = [], events = {}, attrs = {} } = options;
    return {
        tagName,
        attrs,
        children,
        events,
    };
};
