import render from './render';
import mount from './mount';

import { ParadoxVirtualElement } from '../types';

export let targetNodeCache: HTMLElement = document.body

export function setTargetNodeCache(targetNode: HTMLElement) {
  targetNodeCache = targetNode;
}

export default function renderVirtualDOM(vDOM: ParadoxVirtualElement[], targetNode: HTMLElement) {
  vDOM.forEach((vnode) => {
    const $node = render(vnode);
    targetNodeCache = mount($node as HTMLElement, targetNode);
  });
}