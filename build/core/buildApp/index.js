"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addState = void 0;
function createVirtualDOM(treeFunc) {
    return treeFunc();
}
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
;
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
            vDOM.push(createElement(key, { attrs, events, children }));
        }
    }
    return vDOM;
}
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
;
function mount(vnode, $target) {
    $target.replaceWith(vnode);
    return vnode;
}
function renderVirtualDOM(vDOM, targetNode) {
    vDOM.forEach((vnode) => {
        const $node = render(vnode);
        targetNodeCache = mount($node, targetNode);
    });
}
function diffAttrs(oldAttrs, newAttrs) {
    const patches = [];
    for (const [key, value] of Object.entries(newAttrs)) {
        patches.push(node => {
            node.setAttribute(key, value);
            return node;
        });
    }
    for (const key of Object.keys(oldAttrs)) {
        if (!(key in newAttrs)) {
            patches.push(node => {
                node.removeAttribute(key);
                return node;
            });
        }
    }
    return (node) => {
        for (const patch of patches) {
            patch(node);
        }
    };
}
function zip(xs, ys) {
    const zipped = [];
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
}
function diffChildren(oldChildren, newChildren) {
    const patches = [];
    for (const [oldChild, newChild] of zip(oldChildren, newChildren)) {
        patches.push(diff(oldChild, newChild));
    }
    const additionalPatches = [];
    for (const additionalChild of newChildren.slice(oldChildren.length)) {
        additionalPatches.push(node => {
            node.appendChild(render(additionalChild));
            return node;
        });
    }
    return (parent) => {
        for (const [patch, child] of zip(patches, parent.childNodes)) {
            patch(child);
        }
        for (const patch of additionalPatches) {
            patch(parent);
        }
        return parent;
    };
}
function diff(originalOldTree, originalNewTree) {
    const oldTree = originalOldTree[0];
    const newTree = originalNewTree[0];
    if (!newTree) {
        return (node) => {
            node.remove();
            return undefined;
        };
    }
    if (typeof oldTree === "string" || typeof newTree === "string") {
        if (oldTree !== newTree) {
            return (node) => {
                const newNode = render(newTree);
                node.replaceWith(newNode);
                return newNode;
            };
        }
        else {
            return (node) => undefined;
        }
    }
    if (oldTree.tagName !== newTree.tagName) {
        return (node) => {
            const newNode = render(newTree);
            node.replaceWith(newNode);
            return newTree;
        };
    }
    const patchAttr = diffAttrs(oldTree.attrs, newTree.attrs);
    const patchChildren = diffChildren(oldTree.children, newTree.children);
    return (node) => {
        patchAttr(node);
        patchChildren(node);
        return node;
    };
}
;
function addState(value) {
    let state = value;
    const callback = (val) => {
        state = val;
        const newVTree = createVirtualDOM(treeFuncCache);
        const newVDOM = buildVirtualDOM(newVTree);
        console.log(vDOM, newVDOM);
        if (diff(vDOM, newVDOM)) {
            vDOM = newVDOM;
            console.log("rendering");
            renderVirtualDOM(vDOM, targetNodeCache);
        }
    };
    return [state, callback];
}
exports.addState = addState;
let vTree = {};
let vDOM = {};
let treeFuncCache;
let targetNodeCache = document.body;
function app(treeFunc, targetNode) {
    treeFuncCache = treeFunc;
    targetNodeCache = targetNode;
    vTree = createVirtualDOM(treeFunc);
    vDOM = buildVirtualDOM(vTree);
    renderVirtualDOM(vDOM, targetNode);
    // onStateChange(proxyObj, () => {
    //   console.log(proxyObj);
    //   const newVTree = createVirtualDOM(treeFunc);
    //   const newVDOM = buildVirtualDOM(newVTree);
    //   console.log(vDOM, newVDOM);
    //   // if (diff(vDOM, newVDOM)) {
    //   //   vDOM = newVDOM;
    //   //   renderVirtualDOM(vDOM, targetNode);
    //   // }
    // });
}
exports.default = app;
