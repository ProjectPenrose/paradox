"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addState = exports.addEffect = exports.onStateChange = void 0;
const proxySubscribersMap = new WeakMap();
const SUBSCRIBE_METHOD = Symbol();
const toBeNotified = new Set();
function notifyNext(fn) {
    toBeNotified.add(fn);
    Promise.resolve().then(flush);
}
function flush() {
    for (const fn of toBeNotified) {
        fn();
    }
    toBeNotified.clear();
}
function proxy(obj) {
    const subscribers = new Set();
    let initialised = false;
    const result = new Proxy({}, {
        get(target, property) {
            if (property === SUBSCRIBE_METHOD) {
                return subscribers;
            }
            return target[property];
        },
        set(target, property, value) {
            if (initialised && obj[property] === value)
                return true;
            obj[property] = value;
            if (value && typeof value === "object" && !Array.isArray(value)) {
                value = proxy(value);
            }
            target[property] = value;
            subscribers.forEach((subscriber) => {
                notifyNext(subscriber);
            });
            return true;
        }
    });
    for (const key in obj) {
        result[key] = obj[key];
    }
    initialised = true;
    proxySubscribersMap.set(result, subscribers);
    return result;
}
const proxyObj = proxy({});
function onStateChange(proxyObj, callback) {
    if (!proxySubscribersMap.has(proxyObj)) {
        throw new Error("proyxObj is not a proxy");
    }
    proxySubscribersMap.get(proxyObj).add(callback);
    proxyObj[SUBSCRIBE_METHOD].add(callback);
    return () => {
        proxySubscribersMap.get(proxyObj).delete(callback);
    };
}
exports.onStateChange = onStateChange;
function addEffect(fn) {
    notifyNext(fn);
}
exports.addEffect = addEffect;
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
