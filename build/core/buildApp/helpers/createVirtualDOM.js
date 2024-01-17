"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createVirtualDOM(treeFunc) {
    return treeFunc();
}
exports.default = createVirtualDOM;
