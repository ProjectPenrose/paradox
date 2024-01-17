import { ParadoxVirtualElement, ParadoxElementChildren, HTMLAttributes } from "../types";
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

export default function render(vnode: ParadoxVirtualElement): HTMLElement | Text {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  
  return renderEle(vnode as ParadoxVirtualElement);
};