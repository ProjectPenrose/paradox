"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildElement_1 = __importDefault(require("./core/buildElement"));
const Router_1 = __importDefault(require("./core/Router"));
const Pubsub_1 = __importDefault(require("./core/Pubsub"));
const Paradox = {
    buildElement: buildElement_1.default,
    Router: Router_1.default,
    pubsub: Pubsub_1.default
};
exports.default = Paradox;
