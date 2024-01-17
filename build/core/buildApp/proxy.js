"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEffect = exports.onStateChange = void 0;
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
