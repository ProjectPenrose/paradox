import buildElement from "./core/buildElement";
import Router from "./core/Router";
/**
 * Represents the Paradox object.
 */
declare const Paradox: {
    buildElement: typeof buildElement;
    Router: typeof Router;
    pubsub: {
        events: {
            [key: string]: Set<(data: any) => void>;
        };
        subscribe(event: string, callback: (data: any) => void): Set<(data: any) => void>;
        unsubscribe(event: string, callback: (data: any) => void): Set<(data: any) => void>;
        publish(event: string, data?: object): any[];
    };
};
export default Paradox;
