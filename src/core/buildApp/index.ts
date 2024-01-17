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

function mount(vnode: HTMLElement, target: HTMLElement): HTMLElement {
  target.replaceWith(vnode);
  return vnode;
}

function renderVirtualDOM(vDOM: ParadoxVirtualElement[], targetNode: HTMLElement) {
  vDOM.forEach((vnode) => {
    const $node = render(vnode);
    targetNodeCache = mount($node as HTMLElement, targetNode);
  });
}

type Patch = (node: HTMLElement) => HTMLElement | Text | undefined | ParadoxVirtualElement;

function diffAttrs (oldAttrs: HTMLAttributes, newAttrs: HTMLAttributes): (node: HTMLElement) => void {
  
  const patches: Patch[] = [];

  for (const [key, value] of Object.entries(newAttrs)) {
    patches.push(node => {
      node.setAttribute(key, value as string);
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

  return (node: HTMLElement) => {
    for (const patch of patches) {
      patch(node);
    }
  }
}

function zip(xs: Array<any>, ys: Array<any>): Array<any> {
  const zipped = [];

  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }

  return zipped;
}

function diffChildren (oldChildren: ParadoxElementChildren, newChildren: ParadoxElementChildren): (node: HTMLElement) => HTMLElement {
  const patches: Patch[] = [];

  for (const [oldChild, newChild] of zip(oldChildren, newChildren)) {
    patches.push(diff(oldChild, newChild));
  }

  const additionalPatches: Patch[] = [];

  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    additionalPatches.push(node => {
      node.appendChild(render(additionalChild as ParadoxVirtualElement));
      return node;
    });
  }
  
  return (parent: HTMLElement) =>  {
    for (const [patch, child] of zip(patches, parent.childNodes as any)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch(parent);
    }
    return parent;
  }
}

function diff(originalOldTree: ParadoxVirtualElement[], originalNewTree: ParadoxVirtualElement[]): Patch {
  const oldTree = originalOldTree[0]
  const newTree = originalNewTree[0]
  if (!newTree) {
    return (node: HTMLElement): undefined => {
      node.remove();
      return undefined;
    }
  }

  if (typeof oldTree === "string" || typeof newTree === "string") {
    if (oldTree !== newTree) {
      return (node: HTMLElement) => {
        const newNode = render(newTree);
        node.replaceWith(newNode);
        return newNode;
      }
    } else {
      return (node: HTMLElement) => undefined;
    }
  }
  if (oldTree.tagName !== newTree.tagName) {
    return (node: HTMLElement) => {
      const newNode = render(newTree);
      node.replaceWith(newNode);
      return newTree;
    }
  }

  const patchAttr = diffAttrs(oldTree.attrs, newTree.attrs);
  const patchChildren = diffChildren(oldTree.children, newTree.children);

  return (node: HTMLElement) => {
    patchAttr(node);
    patchChildren(node);
    return node;
  }
};

type State = any;
type StateCallback = (val: any) => void;

export function addState (value: any): [State, StateCallback] {
  let state = value;
  const callback = (val: any) => {
    state = val;    
    const newVTree = createVirtualDOM(treeFuncCache);
    const newVDOM = buildVirtualDOM(newVTree);
    
    if (diff(vDOM as ParadoxVirtualElement[], newVDOM as ParadoxVirtualElement[])) {
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
