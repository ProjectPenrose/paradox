import Paradox from "../index";

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

    describe('options', () => {
      const options = {
        id: "test",
        classList: "test test2",
        attributes: { "data-test": "test" },
        text: "test",
        style: { color: "red" },
        children: Array<object>(),
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
          expect((element.style as any)[key]).toBe(value);
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
          if (element.children[2] && children[2].options) {
            expect(element.children[2].children.length).toBe(children[2].options.children.length);
          }
        });
      });

      describe("events", () => {
        const events = {
          click: (ev: { target: any }) => {
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
    expect(Paradox.hasOwnProperty("Router")).toBe(true);
  });

  describe('Router', () => {
    it("should be a function", () => {
      expect(typeof Router).toBe("function");
    });

    function Home() {
      document.body.innerHTML = `<div>Home <a href="/about?hello=world">About</a></div>`;
    }

    function About() {
      document.body.innerHTML = `<div>About <a href="/">Home</a></div>`;
    }

    const routes = [
      { path: "/", component: Home },
    ];
    const router = new Router({ routes, baseUrl: "http://localhost" });

    describe("Objcet properties", () => {

      it("should have routes property", () => {
        expect(router.hasOwnProperty("routes")).toBe(true);
      });

      it("should have baseUrl property", () => {
        expect(router.hasOwnProperty("baseUrl")).toBe(true);
      });

      it("should have path property", () => {
        expect(router.hasOwnProperty("path")).toBe(true);
      });

      it("should have queryString property", () => {
        expect(router.hasOwnProperty("queryString")).toBe(true);
      });

      it("should have params property", () => {
        expect(router.hasOwnProperty("params")).toBe(true);
      });

      it("should have memo property", () => {
        expect(router.hasOwnProperty("memo")).toBe(true);
      });

      it("should have init method", () => {
        expect(typeof router.init).toBe("function");
      });
    });

    describe("init", () => {
      router.init();
      
      it("should set the path", () => {
        expect(router.path).toBe("/");
      });

      describe("/ route", () => {

        it("Should append the component to the DOM", () => {
          expect(document.body.innerHTML).toBe(`<div>Home <a href="/about?hello=world">About</a></div>`);
        });

        it("should set the memo", () => {
          expect(router.memo["/"]).toBeDefined();
        });

        it("should set the queryString", () => {
          expect(router.queryString).toBe("");
        });

        it("should set the params", () => {
          expect(router.params.size).toBe(0);
        });

        it("should set the query", () => {
          expect(router.query.toString()).toBe("");
        });

        it("should set the props", () => {
          expect(router.routes[0].props).toBeDefined();
        });
      });
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