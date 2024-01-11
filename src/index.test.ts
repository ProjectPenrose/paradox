import Paradox from "./index";

const { buildElement, Router, pubsub } = Paradox;

describe('Paradox', () => {
  it("should be an object", () => {
    expect(typeof Paradox).toBe("object");
  });

  it('should have buildElement property', () => {
    expect(Paradox.hasOwnProperty("buildElement")).toBe(true);
  });

  describe('buildElement', () => {
    it("should be a function", () => {
      expect(typeof buildElement).toBe("function");
    });

    it ("should return an HTMLElement", () => {
      let element = buildElement("div");
      expect(element instanceof HTMLElement).toBe(true);
    });
  });

  it('should have Router property', () => {
    expect(Paradox.hasOwnProperty("Router")).toBe(true);
  });

  describe('Router', () => {
    it("should be a function", () => {
      expect(typeof Router).toBe("function");
    });
  });

  it('should have pubsub property', () => {
    expect(Paradox.hasOwnProperty("pubsub")).toBe(true);
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