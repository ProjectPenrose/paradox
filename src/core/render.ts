import { VDOM } from "./createElement";

function renderEle (vnode: VDOM): HTMLElement {
  let { tagName, attrs, children, events } = vnode;

  const $el = document.createElement(tagName);

  for (const [key, value] of Object.entries(attrs)) {
    
    $el.setAttribute(key, value.toString());
  }

  for (const child of children) {
    const $child = render(child as VDOM);
    $el.appendChild($child);
  }

  for (const [key, value] of Object.entries(events)) {
    if (Array.isArray(value)) {
      for (const event of value) {
        $el.addEventListener(key, event as EventListener);
      }
      continue;
    } else {
      $el.addEventListener(key, value as EventListener);
    }
  }

  return $el;
};

export default function render (vnode: VDOM): HTMLElement | Text {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  
  return renderEle(vnode);
};