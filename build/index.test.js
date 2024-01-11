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
        it("should return an HTMLElement", () => {
            let element = buildElement("div");
            expect(element instanceof HTMLElement).toBe(true);
        });
        describe('options', () => {
            const options = {
                id: "test",
                classList: "test test2",
                attributes: { "data-test": "test" },
                text: "test",
                style: { color: "red" },
                children: Array(),
                events: {}
            };
            let element = buildElement("div", options);
            it("should set the ID if provided", () => {
                expect(element.id).toBe(options.id);
            });
            it("should add classes if provided", () => {
                const classList = options.classList.split(" ");
                for (let className of classList) {
                    expect(element.classList.contains(className)).toBe(true);
                }
            });
            it("should set attributes if provided", () => {
                for (let [key, value] of Object.entries(options.attributes)) {
                    expect(element.getAttribute(key)).toBe(value);
                }
            });
            it("should set text content if provided", () => {
                expect(element.textContent).toBe(options.text);
            });
            it("should set inline styles if provided", () => {
                for (let [key, value] of Object.entries(options.style)) {
                    expect(element.style[key]).toBe(value);
                }
            });
            describe("children", () => {
                const children = [
                    { tag: "span" },
                    { tag: "span" },
                    {
                        tag: "span", options: {
                            children: [
                                { tag: "span" },
                                { tag: "span" }
                            ]
                        }
                    }
                ];
                options.children = children;
                element = buildElement("div", options);
                it("should append children if provided", () => {
                    expect(element.children.length).toBe(children.length);
                });
                it("should append nested children if provided", () => {
                    expect(element.children[2].children.length).toBe(children[2].options.children.length);
                });
            });
            describe("events", () => {
                const events = {
                    click: (ev) => {
                        return ev.target;
                    },
                };
                options.events = events;
                element = buildElement("div", options);
                it("should add event listeners if provided", () => {
                    expect(element.onclick).toBeDefined();
                });
            });
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
