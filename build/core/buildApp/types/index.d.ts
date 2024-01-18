type DataSet = {
    [key: string]: string;
};
export type HTMLAttributes = {
    [key: string]: string | number | boolean | DataSet;
};
export type ParadoxEvents = {
    [key: string]: EventListener | EventListener[];
};
export type ParadoxElementChildren = (ParadoxElement | string)[];
export type ParadoxAppFunction = () => ParadoxElementResult | ParadoxElement | ParadoxElement[];
export type ParadoxElement = {
    attrs: HTMLAttributes;
    events?: ParadoxEvents;
    children: ParadoxElementChildren;
} | ParadoxAppFunction | string | ParadoxElement[];
export type ParadoxElementResult = {
    [key: string]: ParadoxElement | ParadoxElement[] | string;
};
export type ParadoxVirtualElement = {
    tagName: string;
    attrs: HTMLAttributes;
    children: ParadoxElementChildren;
    events?: ParadoxEvents;
} | string;
export type Patch = (node: HTMLElement) => HTMLElement | Text | undefined | ParadoxVirtualElement;
export type State = any;
export type StateCallback = (val: any) => void;
export {};
