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
declare const _default: (tagName: string, options?: Options) => VDOM;
export default _default;
