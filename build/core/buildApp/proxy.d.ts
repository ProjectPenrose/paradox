type ParadoxProxy = {
    [key: string]: any;
};
export declare function onStateChange(proxyObj: ParadoxProxy, callback: Function): () => void;
export declare function addEffect(fn: Function): void;
export {};
