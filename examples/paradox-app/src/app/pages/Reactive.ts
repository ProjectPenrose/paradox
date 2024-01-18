import Paradox from "penrose-paradox";
import { addState } from "penrose-paradox/build/core/buildApp"
import { RouterProps } from "penrose-paradox/build/core/Router";
import { ParadoxElement } from "penrose-paradox/build/core/buildApp/types";

export default function Reactive () {

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

  function Test(props = { count }): ParadoxElement {
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
    document.getElementById("root") as HTMLElement
  )

  // console.log(app);
};