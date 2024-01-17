export default function mount (vnode: HTMLElement, $target: HTMLElement): HTMLElement {
  $target.replaceWith(vnode);
  return vnode;
}