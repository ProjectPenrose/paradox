"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { buildElement, Router, pubsub } = index_1.default;
describe('Paradox', () => {
    it("should be an object", () => {
        expect(typeof index_1.default).toBe("object");
    });
    it('should have buildElement property', () => {
        expect(index_1.default.hasOwnProperty("buildElement")).toBe(true);
    });
    describe('buildElement', () => {
        it("should be a function", () => {
            expect(typeof buildElement).toBe("function");
        });
    });
    it('should have Router property', () => {
        expect(index_1.default.hasOwnProperty("Router")).toBe(true);
    });
    describe('Router', () => {
        it("should be a function", () => {
            expect(typeof Router).toBe("function");
        });
    });
    it('should have pubsub property', () => {
        expect(index_1.default.hasOwnProperty("pubsub")).toBe(true);
    });
    describe('pubsub', () => {
        it("should be an object", () => {
            expect(typeof pubsub).toBe("object");
        });
        it("should have events property", () => {
            expect(pubsub.hasOwnProperty("events")).toBe(true);
        });
        it("should have subscribe method", () => {
            expect(typeof pubsub.subscribe).toBe("function");
        });
        it("should have unsubscribe method", () => {
            expect(typeof pubsub.unsubscribe).toBe("function");
        });
        it("should have publish method", () => {
            expect(typeof pubsub.publish).toBe("function");
        });
    });
});
