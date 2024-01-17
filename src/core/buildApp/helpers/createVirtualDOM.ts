import { ParadoxElement } from "../types";

export default function createVirtualDOM(treeFunc: Function): ParadoxElement | ParadoxElement[] {
  return treeFunc() as ParadoxElement | ParadoxElement[];
}