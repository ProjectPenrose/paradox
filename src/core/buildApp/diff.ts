import render from "./render";

function diffAttrs (oldAttrs, newAttrs) {
  
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

  return node => {
    for (const patch of patches) {
      patch(node);
    }
  }
}

function zip(xs, ys) {
  const zipped = [];

  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }

  return zipped;
}

function diffChildren (oldChildren, newChildren) {
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
  
  return parent =>  {
    for (const [patch, child] of zip(patches, parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch(parent);
    }
    return parent;
  }
}

export default function diff (oldTree, newTree) {
  oldTree = oldTree[0]
  newTree = newTree[0]
  if (!newTree) {
    return node => {
      node.remove();
      return undefined;
    }
  }

  if (typeof oldTree === "string" || typeof newTree === "string") {
    if (oldTree !== newTree) {
      return node => {
        const newNode = render(newTree);
        node.replaceWith(newNode);
        return newNode;
      }
    } else {
      return node => undefined;
    }
  }
  if (oldTree.tagName !== newTree.tagName) {
    return node => {
      const newNode = render(newTree);
      node.replaceWith(newNode);
      return newTree;
    }
  }

  const patchAttr = diffAttrs(oldTree.attrs, newTree.attrs);
  const patchChildren = diffChildren(oldTree.children, newTree.children);

  return node => {
    patchAttr(node);
    patchChildren(node);
    return node;
  }
};