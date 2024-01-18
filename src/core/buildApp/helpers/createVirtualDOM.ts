import { ParadoxElementResult, ParadoxElement } from "../types";

export default function createVirtualDOM(treeFunc: Function): ParadoxElementResult | ParadoxElementResult[] | ParadoxElement[] {
  return treeFunc() as ParadoxElementResult | ParadoxElementResult[];
}