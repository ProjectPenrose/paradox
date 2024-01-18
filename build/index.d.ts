import buildElement from "./core/buildElement";
import Router from "./core/Router";
import buildApp from "./core/buildApp";
/**
 * Represents the Paradox object.
 */
declare const Paradox: {
    buildElement: typeof buildElement;
    Router: typeof Router;
    pubsub: {
        events: import("./core/Pubsub").EventMap;
        subscribe(event: string, callback: import("./core/Pubsub").EventCallback): Set<import("./core/Pubsub").EventCallback>;
        unsubscribe(event: string, callback: import("./core/Pubsub").EventCallback): Set<import("./core/Pubsub").EventCallback>;
        publish(event: string, data?: object): any[];
    };
    buildApp: typeof buildApp;
};
export default Paradox;
