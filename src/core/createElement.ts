type HTMLAttributes = {
  [key: string]: string | number | boolean;
};

type Children = (VDOM | string)[];

type Options = {
  children?: Children;
  attrs?: HTMLAttributes;
  events?: {
    [key: string]: EventListener | EventListener[];
  };
};

export type VDOM = {
  tagName: string;
  attrs: HTMLAttributes;
  children: Children;
  events?: {
    [key: string]: EventListener | EventListener[];
  };
};

export default (tagName: string, options: Options = { children: [], events: {}, attrs: {} }): VDOM => {
  if (!tagName) throw new Error("tagName is required");
  const { children = [], events = {}, attrs = {} } = options;
  return {
    tagName,
    attrs,
    children,
    events,
  };
};