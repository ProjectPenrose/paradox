import { ParadoxAppFunction } from "./types";
type State = any;
type StateCallback = (val: any) => void;
export declare function addState(value: any): [State, StateCallback];
export default function app(treeFunc: ParadoxAppFunction, targetNode: HTMLElement): void;
export {};
