type DataSet = {
    [key: string]: string;
};
type HTMLAttributes = {
    [key: string]: string | number | boolean | DataSet;
};
type ParadoxEvents = {
    [key: string]: EventListener | EventListener[];
};
type ParadoxAppFunction = () => ParadoxElement | ParadoxElement[];
type ParadoxElementChildren = (ParadoxElement | string)[];
type ParadoxElement = {
    attrs: HTMLAttributes;
    events?: ParadoxEvents;
    children: ParadoxElementChildren;
} | ParadoxAppFunction | string | ParadoxElement[];
type State = any;
type StateCallback = (val: any) => void;
export declare function addState(value: any): [State, StateCallback];
export default function app(treeFunc: ParadoxAppFunction, targetNode: HTMLElement): void;
export {};
