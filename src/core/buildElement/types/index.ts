export type ParadoxElementChildren = { tag: string; options: ParadoxElementOptions }[];

export type ParadoxElementOptions = {
  id?: string;
  classList?: string;
  children?: ParadoxElementChildren;
  attributes?: { [key: string]: string };
  events?: { [key: string]: EventListener };
  text?: string;
  style?: { [key: string]: string };
};

export type ParadoxEventListenerWeakMap = WeakMap<HTMLElement, Map<string, EventListener>>;

export type ParadoxElementMemoizedText = { [key: string]: string };

export type ParadoxElementCache = { [key: string]: HTMLElement };