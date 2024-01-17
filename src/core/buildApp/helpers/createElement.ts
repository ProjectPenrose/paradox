import { ParadoxElement, ParadoxVirtualElement, ParadoxElementChildren, ParadoxEvents } from '../types';
export default function createElement(tagName: string, options: ParadoxElement = { children: [], events: {}, attrs: {} }): ParadoxVirtualElement {
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