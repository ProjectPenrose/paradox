"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildElement_1 = __importDefault(require("./core/buildElement"));
const buildElementTypes = __importStar(require("./core/buildElement/types"));
const Router_1 = __importStar(require("./core/Router")), RouterTypes = Router_1;
const Pubsub_1 = __importStar(require("./core/Pubsub")), pubsubTypes = Pubsub_1;
const buildApp_1 = __importDefault(require("./core/buildApp"));
const buildAppTypes = __importStar(require("./core/buildApp/types"));
/**
 * Represents the Paradox object.
 */
const Paradox = {
    buildElement: buildElement_1.default,
    Router: Router_1.default,
    pubsub: Pubsub_1.default,
    buildApp: buildApp_1.default,
    types: {
        buildElement: buildElementTypes,
        Router: RouterTypes,
        pubsub: pubsubTypes,
        buildApp: buildAppTypes,
    }
};
exports.default = Paradox;
