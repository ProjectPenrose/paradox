"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mount(vnode, target) {
    target.replaceWith(vnode);
    return vnode;
}
exports.default = mount;
