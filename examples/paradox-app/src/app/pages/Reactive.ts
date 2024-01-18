import Paradox from "penrose-paradox";
// import createElement from "../../../../build/core/createElement";
// import render from "../../../../build/core/render";
// import mount from "../../../../build/core/mount";
// import diff from "../../../../build/core/diff";
import { addState } from "../../../node_modules/penrose-paradox/src/core/buildApp/index";

export default function Reactive () {
  // console.log("Reactive page");

  // const createVApp = (count) => createElement("div", {
  //   attrs: {
  //     id: "app",
  //     dataCount: count
  //   },
  //   children: [
  //     createElement("input"),
  //     String(count),
  //     createElement("img", {
  //       attrs: {
  //         src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW9pem8xcXlsamQ3Y3c4cjQ3bWVsMGE2cWJ6ZmV4aWZ5NmJteThhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Af7J60LV3SjIqWXzzj/giphy.gif"
  //       }
  //     }),
  //   ]
  // });

  // let count = 0;
  // let vApp = createVApp(count);
  // const app = render(vApp);

  // let rootEle = mount(app, document.getElementById("root"));

  // setInterval(() => {
  //   count++;
  //   const vNewApp = createVApp(count);
  //   const patch = diff(vApp, vNewApp);
  //   rootEle = patch(rootEle);
  //   vApp = vNewApp;
  // }, 1000);

  function Input(props = { count }) {
    // console.log(props);
    const [state, setState] = addState(count);
    console.log(state)//, setState);

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
    }
  } 

  function Test(props = { count }) {
    // console.log(props);
    return {
      div: {
        attrs: {
          id: "app",
          classList: "test test2",
          data: {
            count: count
          },
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
    }
  }

  let count = 0;
  Paradox.buildApp(
    Test.bind({ count }),
    document.getElementById("root")
  )

  // console.log(app);
};