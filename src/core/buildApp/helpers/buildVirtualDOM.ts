import createElement from "./createElement";

import { ParadoxElement, ParadoxVirtualElement } from "../types";

export default function buildVirtualDOM(vTree: ParadoxElement | ParadoxElement[]): ParadoxVirtualElement[] {
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