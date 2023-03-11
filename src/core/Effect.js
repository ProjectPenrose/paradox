import { useStateChange } from "./Proxy";

function useEffect(callbak, states = []) {
  if (states.length) {
    states.forEach(state => {
      useStateChange(state, () => {
        // console.info("state changed");
        callbak()
      })
    })
  }
  callbak()
}

export { useEffect }