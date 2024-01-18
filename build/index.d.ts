import buildElement from "./core/buildElement";
import * as buildElementTypes from "./core/buildElement/types";
import Router, * as RouterTypes from "./core/Router";
import * as pubsubTypes from "./core/Pubsub";
import buildApp from "./core/buildApp";
import * as buildAppTypes from "./core/buildApp/types";
/**
 * Represents the Paradox object.
 */
declare const Paradox: {
    buildElement: typeof buildElement;
    Router: typeof Router;
    pubsub: {
        events: pubsubTypes.EventMap;
        subscribe(event: string, callback: pubsubTypes.EventCallback): Set<pubsubTypes.EventCallback>;
        unsubscribe(event: string, callback: pubsubTypes.EventCallback): Set<pubsubTypes.EventCallback>;
        publish(event: string, data?: object): any[];
    };
    buildApp: typeof buildApp;
    types: {
        buildElement: typeof buildElementTypes;
        Router: typeof RouterTypes;
        pubsub: typeof pubsubTypes;
        buildApp: typeof buildAppTypes;
    };
};
export default Paradox;
