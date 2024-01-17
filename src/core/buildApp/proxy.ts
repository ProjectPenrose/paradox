const proxySubscribersMap = new WeakMap();
const SUBSCRIBE_METHOD: string | Symbol = Symbol();
const toBeNotified: Set<Function> = new Set();

function notifyNext(fn: Function): void {
  toBeNotified.add(fn);
  Promise.resolve().then(flush);
}

function flush() {
  for (const fn of toBeNotified) {
    fn();
  }
  toBeNotified.clear();
}

type ParadoxProxy = {
  [key: string]: any;
};

type ProxyObject = {
  [key: string]: any;
};

function proxy(obj: ProxyObject) {
  const subscribers = new Set();
  let initialised = false;

  const result = new Proxy(
    {},
    {
      get(target: ParadoxProxy, property: Symbol | string) {
        if (property === SUBSCRIBE_METHOD) {
          return subscribers;
        }
        return target[property as string];
      },
      set(target: ParadoxProxy, property: Symbol | string, value) {
        if (initialised && obj[property as string] === value) return true;

        obj[property as string] = value;
        if (value && typeof value === "object" && !Array.isArray(value)) {
          value = proxy(value);
        }
        target[property as string] = value;

        subscribers.forEach((subscriber) => {
          notifyNext(subscriber as Function);
        });

        return true;
      }
    }
  );

  for (const key in obj) {
    result[key] = obj[key];
  }

  initialised = true;

  proxySubscribersMap.set(result, subscribers);

  return result;
}
const proxyObj = proxy({});

export function onStateChange(proxyObj: ParadoxProxy, callback: Function) {
  if (!proxySubscribersMap.has(proxyObj)) {
    throw new Error("proyxObj is not a proxy");
  }
  proxySubscribersMap.get(proxyObj).add(callback);
  proxyObj[SUBSCRIBE_METHOD as string].add(callback);
  return () => {
    proxySubscribersMap.get(proxyObj).delete(callback);
  };
}

export function addEffect (fn: Function) {
  notifyNext(fn);
}