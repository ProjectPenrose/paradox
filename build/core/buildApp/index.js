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
exports.addState = void 0;
const createVirtualDOM_1 = __importDefault(require("./helpers/createVirtualDOM"));
const buildVirtualDOM_1 = __importDefault(require("./helpers/buildVirtualDOM"));
const renderVirtualDOM_1 = __importStar(require("./helpers/renderVirtualDOM"));
const diff_1 = __importDefault(require("./helpers/diff"));
function addState(value) {
    let state = value;
    const callback = (val) => {
        state = val;
        const newVTree = (0, createVirtualDOM_1.default)(treeFuncCache);
        const newVDOM = (0, buildVirtualDOM_1.default)(newVTree);
        if ((0, diff_1.default)(vDOM, newVDOM)) {
            vDOM = newVDOM;
            console.log("rendering");
            (0, renderVirtualDOM_1.default)(vDOM, renderVirtualDOM_1.targetNodeCache);
        }
    };
    return [state, callback];
}
exports.addState = addState;
let vTree = {};
let vDOM = {};
let treeFuncCache;
function app(treeFunc, targetNode) {
    treeFuncCache = treeFunc;
    (0, renderVirtualDOM_1.setTargetNodeCache)(targetNode);
    vTree = (0, createVirtualDOM_1.default)(treeFunc);
    vDOM = (0, buildVirtualDOM_1.default)(vTree);
    (0, renderVirtualDOM_1.default)(vDOM, targetNode);
}
exports.default = app;
