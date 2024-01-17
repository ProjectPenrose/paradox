import createElement from "./createElement";
import render from "./render";
import mount from "./mount";
import diff from "./diff";

type DataSet = {
  [key: string]: string;
};

type HTMLAttributes = {
  [key: string]: string | number | boolean | DataSet;
};

type ParadoxEvents = {
  [key: string]:EventListener | EventListener[];
};

type ParadoxElement = {
  attrs: HTMLAttributes;
  events: ParadoxEvents;
  children: (ParadoxElement | string)[];
};

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

  const result = new Proxy(
    {},
    {
      get(target, property) {
        if (property === SUBSCRIBE_METHOD) {
          return subscribers;
        }
        return target[property];
      },
      set(target, property, value) {
        if (initialised && obj[property] === value) return true;

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
    }
  );

  for (const key in obj) {
    result[key] = obj[key];
  }

  initialised = true;

  proxySubscribersMap.set(result, subscribers);

  return result;
}
const proxyObj = proxy({});

export function addState (value: any) {  
  // const obj = Object.assign(proxyObj, value)
  // // console.log(obj);
  
  // const callback = (object) => {
  //   Object.keys(object).forEach(o => {
  //     if (obj[o]) obj[o] = object[o]
  //   })
  //   Object.assign(obj, object)
  // }
  let state = value;
  const callback = (val) => {
    state = val;
    // console.log(state);
    
    const newVTree = createVirtualDOM(treeFuncCache);
    const newVDOM = buildVirtualDOM(newVTree);
    console.log(vDOM, newVDOM);
    
    if (diff(vDOM, newVDOM)) {
      vDOM = newVDOM;
      console.log("rendering");
      renderVirtualDOM(vDOM, targetNodeCache);
    }
  }
  return [state, callback]
}
export function onStateChange(proxyObj, callback) {
  if (!proxySubscribersMap.has(proxyObj)) {
    throw new Error("proyxObj is not a proxy");
  }
  proxySubscribersMap.get(proxyObj).add(callback);
  proxyObj[SUBSCRIBE_METHOD].add(callback);
  return () => {
    proxySubscribersMap.get(proxyObj).delete(callback);
  };
}

export function addEffect (fn: Function) {
  notifyNext(fn);
}

function buildVirtualDOM (vTree: ParadoxElement[]) {
  let vDOM = [];
  // create virtual DOM
  if (!Array.isArray(vTree)) vTree = [vTree];
  for (const elementObj of vTree) {
    let elementObject = elementObj;
    if (typeof elementObj === "function") elementObject = elementObj();

    if (typeof elementObject === "string") {
      vDOM.push(elementObject);
      continue;
    }
    
    for (const [key, value] of Object.entries(elementObject)) {
      let { attrs = {}, events = {}, children = [] } = value;
      if (children.length) {
        children = buildVirtualDOM(children);
      }
      vDOM.push(createElement(key, { attrs, events, children })); // TODO: add events
    }
  }

  return vDOM;
}

function renderVirtualDOM(vDOM: ParadoxElement[], targetNode: HTMLElement) {
  // targetNode.innerHTML = ''; // Clear the target node.
  vDOM.forEach((vnode) => {
    const $node = render(vnode);
    targetNodeCache = mount($node, targetNode);
  });
}

function createVirtualDOM(treeFunc: Function): ParadoxElement[] {
  // treeFunc = treeFunc.bind(proxyObj);
  return treeFunc() as ParadoxElement[];
}
 let vTree = {}
 let vDOM = {}
 let treeFuncCache: Function = () => {}
 let targetNodeCache: HTMLElement = document.body
export default function app(treeFunc: Function, targetNode: HTMLElement) {
  treeFuncCache = treeFunc;
  targetNodeCache = targetNode;
  vTree = createVirtualDOM(treeFunc)

  // console.log(vTree);
  
  
  vDOM = buildVirtualDOM(vTree);
  // console.log(vDOM);

  renderVirtualDOM(vDOM, targetNode);

  onStateChange(proxyObj, () => {
    console.log(proxyObj);
    
    const newVTree = createVirtualDOM(treeFunc);
    const newVDOM = buildVirtualDOM(newVTree);
    console.log(vDOM, newVDOM);
    
    // if (diff(vDOM, newVDOM)) {
    //   vDOM = newVDOM;
    //   renderVirtualDOM(vDOM, targetNode);
    // }
  });
}
