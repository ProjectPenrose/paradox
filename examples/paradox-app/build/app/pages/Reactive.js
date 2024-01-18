"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penrose_paradox_1 = __importDefault(require("penrose-paradox"));
const buildApp_1 = require("penrose-paradox/build/core/buildApp");
function Reactive() {
    function Input(props = { count }) {
        // console.log(props);
        const [state, setState] = (0, buildApp_1.addState)(count);
        console.log(state); //, setState);
        function handleClick() {
            count++;
            const newCount = count + 1;
            setState(newCount);
        }
        return {
            input: {
                attrs: {
                    value: `The count is ${state}`
                },
                events: {
                    focus: handleClick
                }
            }
        };
    }
    function Test(props = { count }) {
        // console.log(props);
        return {
            div: {
                attrs: {
                    id: "app",
                    classList: "test test2",
                    // data: {
                    //   count: count
                    // },
                },
                children: [
                    Input.bind({ count }),
                    String(count),
                    {
                        img: {
                            attrs: {
                                src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW9pem8xcXlsamQ3Y3c4cjQ3bWVsMGE2cWJ6ZmV4aWZ5NmJteThhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Af7J60LV3SjIqWXzzj/giphy.gif"
                            }
                        }
                    },
                ]
            }
        };
    }
    let count = 0;
    penrose_paradox_1.default.buildApp(Test.bind({ count }), document.getElementById("root"));
    // console.log(app);
}
exports.default = Reactive;
;
