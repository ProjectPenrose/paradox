import HomeMain from "./components/page/home/HomeMain";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";

export default function() {
  return {
    div: {
      className: "h-100 d-flex flex-column justify-content-between",
      children: [
        {
          Header
        },
        {
          HomeMain
        },
        {
          Footer
        }
      ]
    }
  }
}