import buildElement from "./core/buildElement";
import * as buildElementTypes from "./core/buildElement/types";
import Router, * as RouterTypes from "./core/Router";
import pubsub, * as pubsubTypes from "./core/Pubsub";
import buildApp from "./core/buildApp";
import * as types from "./core/types";

/**
 * Represents the Paradox object.
 */
const Paradox = {
  buildElement,
  Router,
  pubsub,
  buildApp,
  types: {
    buildElement: buildElementTypes,
    Router: RouterTypes,
    pubsub: pubsubTypes,
    buildApp: types,
  }
};

export default Paradox;