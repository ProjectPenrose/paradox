/**
 * Uses document.createElement to create and object and
 * add attributes to it
 * @since 1.0.0
 * @example const myContainer = Paradox.CreateElement(
 *   "div"
 *   {
 *     className: "container",
 *     id: "my-container"
 *   }
 * )
 * 
 * @param {String} name Element name
 * @param {Object} props Object of properties
 * @returns {any} DOM element
 */
export default function CreateElement (name = "div", props = { className: "", id: "" }) {
  // Extract properties
  const { className = "", id = "" } = props

  // Create element
  const element = document.createElement(name)

  // If className, add classes to the element class list
  if (className) {
    const classes = className.split(" ")
    element.classList.add(...classes)
  }
  // If id, set element id
  if (id) element.id = id

  return element
}