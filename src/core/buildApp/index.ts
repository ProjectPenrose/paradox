type DataSet = {
  [key: string]: string;
};

type HTMLAttributes = {
  [key: string]: string | number | boolean | DataSet;
};

type ParadoxEvents = {
  [key: string]:EventListener | EventListener[];
};

type ParadoxAppFunction = () => ParadoxElement | ParadoxElement[]

type ParadoxElementChildren = (ParadoxElement | string)[];
type ParadoxElement = {
  attrs: HTMLAttributes;
  events?: ParadoxEvents;
  children: ParadoxElementChildren;
} | ParadoxAppFunction | string | ParadoxElement[]

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

function createVirtualDOM(treeFunc: Function): ParadoxElement | ParadoxElement[] {
  return treeFunc() as ParadoxElement | ParadoxElement[];
}

type ParadoxVirtualElement = {
  tagName: string;
  attrs: HTMLAttributes;
  children: ParadoxElementChildren;
  events?: ParadoxEvents;
} | string;

function createElement(tagName: string, options: ParadoxElement = { children: [], events: {}, attrs: {} }): ParadoxVirtualElement {
  if (!tagName) throw new Error("tagName is required");

  let children: ParadoxElementChildren = [];
  let events: ParadoxEvents = {};
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
};

function buildVirtualDOM(vTree: ParadoxElement | ParadoxElement[]): ParadoxVirtualElement[] {
  let vDOM: ParadoxVirtualElement[] = [];

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
      vDOM.push(createElement(key, { attrs, events, children } as ParadoxElement));
    }
  }

  return vDOM;
}

function renderEle (vnode: ParadoxVirtualElement): HTMLElement {
  let tagName = "";
  let attrs: HTMLAttributes = {};
  let children: ParadoxElementChildren = [];
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
    const $child = render(child as ParadoxVirtualElement);
    element.appendChild($child);
  }

  for (const [key, value] of Object.entries(events)) {
    if (Array.isArray(value)) {
      for (const event of value) {
        element.addEventListener(key, event as EventListener);
      }
      continue;
    } else {
      element.addEventListener(key, value as EventListener);
    }
  }

  return element;
};

function render(vnode: ParadoxVirtualElement): HTMLElement | Text {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  
  return renderEle(vnode as ParadoxVirtualElement);
};

function mount (vnode: HTMLElement, $target: HTMLElement): HTMLElement {
  $target.replaceWith(vnode);
  return vnode;
}

function renderVirtualDOM(vDOM: ParadoxVirtualElement[], targetNode: HTMLElement) {
  vDOM.forEach((vnode) => {
    const $node = render(vnode);
    targetNodeCache = mount($node as HTMLElement, targetNode);
  });
}

type State = any;
type StateCallback = (val: any) => void;

export function addState (value: any): [State, StateCallback] {
  let state = value;
  const callback = (val: any) => {
    state = val;    
    const newVTree = createVirtualDOM(treeFuncCache);
    const newVDOM = buildVirtualDOM(newVTree);
    console.log(vDOM, newVDOM);
    
    if (diff(vDOM, newVDOM)) {
      vDOM = newVDOM;
      console.log("rendering");
      renderVirtualDOM(vDOM as ParadoxVirtualElement[], targetNodeCache);
    }
  }
  return [state, callback]
}

let vTree: object | ParadoxElement | ParadoxElement[] | ParadoxVirtualElement = {}
let vDOM: object | ParadoxElement[]  = {}
let treeFuncCache: ParadoxAppFunction
let targetNodeCache: HTMLElement = document.body

export default function app(treeFunc: ParadoxAppFunction, targetNode: HTMLElement) {
  treeFuncCache = treeFunc;
  targetNodeCache = targetNode;

  vTree = createVirtualDOM(treeFunc);
  
  vDOM = buildVirtualDOM(vTree as ParadoxElement | ParadoxElement[]);

  renderVirtualDOM(vDOM as ParadoxVirtualElement[], targetNode);

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
