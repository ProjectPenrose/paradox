import Navbar from "../navbars/Navbar"

export default function () {
  return {
    header: {
      className: "container-fluid py-3 bg-dark text-light d-flex align-items-center justify-content-center",
      id: "test",
      attributes: {
        title: "Header",
        role: "banner"
      },
      Navbar
    }
  }
}