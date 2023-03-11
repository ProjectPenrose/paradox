
import Paradox from "../../../core/Paradox";

export default function (props = { isActive }) {
  const { isActive = false } = props
  // const { username, test } = useContext(UserProvider)
  // console.log(username, test, isActive);

  // function handleClick(ev) {
  //   ev.preventDefault()
  //   redirect("/")
  // }
  
  return {
    a: {
      className: "text-light text-decoration-none me-3",
      attributes: {
        title: "Paradox",
        href: "./",
      },
      h1: {
        className: "fw-bold h5 m-0 text-light",
        text: "<Paradox/>",
      },
    },
  }
}