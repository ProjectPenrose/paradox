import render from "./render";

import { ParadoxVirtualElement, Patch, ParadoxElementChildren, HTMLAttributes } from "../types";

function zip(xs: Array<any>, ys: Array<any>): Array<any> {
  const zipped = [];

  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }

  return zipped;
}

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

export default function diff(originalOldTree: ParadoxVirtualElement[], originalNewTree: ParadoxVirtualElement[]): Patch {
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