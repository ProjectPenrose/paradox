import App from "./app/App"
import Paradox from "./core/Paradox"

const root = document.querySelector("#paradox-root")
root.classList.add("h-100")
Paradox.Render(App, root)