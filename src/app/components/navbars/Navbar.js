import Paradox from "../../../core/Paradox"
import Title from "../common/Title"

export default function (props = { activeLink }) {
  // const { activeLink } = props

  // function handleClick(ev) {
  //   ev.preventDefault()
  //   console.log(123);
  //   const { target } = ev
  //   redirect(`/${target.title}`)
  // }
  return {
    div: {
      className: "container d-flex align-items-center",
      Title,
      // div: {
      //   className: "d-flex",
      //   children: [
      //     {
      //       a: {
      //         // onCLick: handleClick,
      //         className: "text-uppercase text-light text-decoration-none",
      //         text: "About",
      //         attributes: {
      //           title: "about",
      //           href: "#",
      //         },
      //       },
      //     },
      //     {
      //       span: {
      //         className: "px-1",
      //       },
      //     },
      //     {
      //       a: {
      //         // onCLick: handleClick,
      //         className: "text-uppercase text-light text-decoration-none",
      //         text: "Tools",
      //         attributes: {
      //           title: "tools",
      //           href: "#",
      //         },
      //       }
      //     }
      //   ]
      // }
    },
  }
}