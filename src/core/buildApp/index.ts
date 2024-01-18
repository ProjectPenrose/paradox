import createVirtualDOM from "./helpers/createVirtualDOM";
import buildVirtualDOM from "./helpers/buildVirtualDOM";
import renderVirtualDOM, { targetNodeCache, setTargetNodeCache } from "./helpers/renderVirtualDOM";
import diff from "./helpers/diff";

import { ParadoxElement, ParadoxAppFunction, ParadoxVirtualElement, State, StateCallback } from "./types";

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

export default function app(treeFunc: ParadoxAppFunction, targetNode: HTMLElement) {
  treeFuncCache = treeFunc;
  setTargetNodeCache(targetNode);

  vTree = createVirtualDOM(treeFunc);
  
  vDOM = buildVirtualDOM(vTree as ParadoxElement | ParadoxElement[]);

  renderVirtualDOM(vDOM as ParadoxVirtualElement[], targetNode);
}
