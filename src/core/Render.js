import { useStateChange } from "./Proxy"

// Render counter
let renderCounter = 0

// callbacks chache
const beforeRenderingStak = {}
const afterRenderingStack = {}

// Reserved words
const reservedWords = ["attributes", "id", "className", "text", "html", "events", "children", "callback", "router", "provider"]

/**
 * Executes a callback before the component renders
 * 
 * @since 0.0.1
 * 
 * @param {Funtion} callback callback to be executed
 */
export function beforeRendering(callback) {
  beforeRenderingStak[renderCounter] = callback
}

/**
 * Executes a callback after the component renders
 * 
 * @since 0.0.1
 * 
 * @param {Funtion} callback callback to be executed
 */
export function afterRendering(callback) {
  afterRenderingStack[renderCounter] = callback
}

/**
 * Executes while rendering a component
 * 
 * @since 0.0.1
 * 
 * @param {Function} callbak callback to be executed
 * @param {Array} states List of states
 */
export function onRendering(callbak, states = []) {
  // If there are states
  if (states.length) {
    states.forEach(state => {
      // Execute the callback each tiem the state change
      useStateChange(state, () => {
        callbak()
      })
    })
  }

  // Otherwise, execute callback
  callbak()
}

/**
 * If the component function was successfully executed
 * this function saves the component in the beforeRenderingStak object
 * 
 * @since 0.0.1
 * 
 * @param {Object} componentObject component object
 */
function ComponentDidMount(componentObject) {
  if (beforeRenderingStak[renderCounter]) beforeRenderingStak[renderCounter](componentObject)
}

/**
 * If the component object successfully rederized
 * this function saves the component in the afterRenderingStack object
 * and execute the componetns callback
 * 
 * @since 0.0.1
 * 
 * @param {Object} parent node
 * @param {Object} componentObject generated component object
 */
function ComponentDidRender(parent, componentObject) {
  if (afterRenderingStack[renderCounter]) {
    const callback = afterRenderingStack[renderCounter]
    setTimeout(() => callback(parent, componentObject))
  }
}

/**
 * Mount component while generating the document tree
 * 
 * @since 0.0.1
 * 
 * @param {Object} tree document tree
 * @param {Object} incoming component tree
 */
function mount(tree, incoming) {
  Object.keys(incoming).forEach(key => {
    tree[key] = incoming[key]
    if (incoming[key] && typeof incoming[key] === "object" && !Array.isArray(incoming[key])) {
      mount(tree[key], incoming[key])
    }
    if (incoming[key] && Array.isArray(incoming[key])) {
      incoming[key].forEach((child) => {
        if (child && typeof child === "object" && !Array.isArray(child)) {
          mount(tree[key], child)
        }
      })
    }
  })
}

/**
 * Render an object
 * 
 * @since 0.0.1
 * 
 * @param {Object} domTree document tree
 * @param {Object} parentNode DOM element
 */
function recursiveRender(domTree, parentNode) {
  // domtree must be an iterable object
  Object.keys(domTree).forEach(key => {
    // If key is router it should return a function
    // so call recursiveRender and pass domTree[key]() and parentNode
    if (key === "router") recursiveRender(domTree[key](), parentNode)

    // If key is provider it should return a function but in this case
    // call Render and pass domTree[key]() and parentNode
    if (key === "provider") {
      Render(domTree[key](), parentNode)
    }

    // if key is not a reserved word or it is but it is also a function named callback
    // call Render and pass domTree[key]() and parentNode and return to stop
    if ((!reservedWords.includes(key) || (reservedWords.includes(key) && key === "callback")) && typeof domTree[key] === "function") {
      Render(domTree[key],parentNode)
      return
    }

    // Decalre node
    const node = !reservedWords.includes(key) && !Number.isInteger(parseInt(key)) ? document.createElement(key) : null

    // If current object position has children
    if (domTree[key].children && Array.isArray(domTree[key].children) && domTree[key].children.length) {
      // For each chealdren call recursiveRender passing
      // the child and the current node
      domTree[key].children.forEach((child, i) => {
        recursiveRender(child, node)
      })
    }

    // If the current position is an object and the key is not a reserved word
    if (typeof domTree[key] === "object" && !reservedWords.includes(key)) {
      // the child and the current node
      recursiveRender(domTree[key], node || parentNode)
    }

    // If the node exists and the current position has className
    // add classes to the elements' class list
    if (node && domTree[key].className) node.classList.add(...domTree[key].className.split(" ").filter(c => c.length))

    // If the node exists and the current position has id
    // add id to the elements
    if (node && domTree[key].id) node.id = domTree[key].id

    // If the node exists and the current position has attributes
    if (node && domTree[key].attributes) {
      // for each attribute, create the elements' attribute
      Object.keys(domTree[key].attributes).forEach(attr => {
        // Take into consideration if the attribute is boolean
        if (attr === "checked") {
          if (domTree[key].attributes[attr]) node.setAttribute(attr, domTree[key].attributes[attr])
        } else if (attr === "disabled") {
          if (domTree[key].attributes[attr]) node.setAttribute(attr, domTree[key].attributes[attr])
        } else if (attr === "selected") {
          if (domTree[key].attributes[attr]) node.setAttribute(attr, domTree[key].attributes[attr])
        } else {
          node.setAttribute(attr, domTree[key].attributes[attr])
        }
      })
    }

    // If the node exists and the current position has events
    if (node && domTree[key].events) {
      // add event listener for each event
      Object.keys(domTree[key].events).forEach(event => {
        node.addEventListener(event, domTree[key].events[event])
      })
    }

    // If the node exists and the current position has text
    // add text content to the element
    if (node && domTree[key].text) {
      node.textContent = domTree[key].text
    }

    // If the node exists and the current position has html
    // add inner html to the element
    if (node && domTree[key].html) {
      node.innerHTML = domTree[key].html
    }

    // If the node exists append it to the parent node
    if (node) {
      parentNode.append(node)
    }
  })
}

/**
 * Render a component
 * 
 * @since 0.0.1
 * 
 * @param {Function} component component function
 * @param {Object} parentNode DOM node
 * @param {Object} props Properties passed to tue componet fuction
 * @param {Object} options Component render options
 */
export default function Render(component, parentNode, props = {}, options = { rewrite: false }) {
  // Extract options
  let { rewrite = false } = options

  // If component should be rewritten
  // empty parent node
  if (rewrite) {
    parentNode.innerHTML = ""
    rewrite = false
  }

  // Declare document tree
  const tree = {}

  // increase render counter
  renderCounter++

  // Execute component and pass props
  const incoming = component(props)

  // Mount component
  ComponentDidMount(incoming)
  mount(tree, incoming)
  ComponentDidRender(parentNode, tree)

  // Recursive render
  recursiveRender(tree, parentNode, component.name === "test" ? true : false)
}