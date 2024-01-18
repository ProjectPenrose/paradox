import { ParadoxAppFunction, State, StateCallback } from "./types";
export declare function addState(value: any): [State, StateCallback];
export default function app(treeFunc: ParadoxAppFunction, targetNode: HTMLElement): void;
