/**
 * Element library
 * 
 * @since 1.0.0
 * @example Paradox.Element("body").html("Hello world")
 * @example Paradox.Element("#mobile-button").addClass("d-md-block")
 * 
 * @param {any} selector DOM element selector
 * @param {any} parentNode DOM parent element
 * @returns {Object} functions that interacts with the DOM element
 */
export default function Element(selector = "body", parentNode = null) {
  // Select element. If the selectror is not a string,
  // it must be a DOM node
  const element = typeof selector !== "string"
    ? selector
    : parentNode ? parentNode.querySelector(selector) : document.querySelector(selector)

  /**
   * Add inner html to the element and get the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("body").html('<div class="container">Hello World</div>')
   * 
   * @param {any} content html content
   * @returns {any} element
   */
  function html(content = null) {
    if (content) element.innerHTML = content
    
    return element
  }

  /**
   * Add thext content to the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("body").text('Hello World')
   * 
   * @param {String} text Text content to add to the element
   * @returns {any} element
   */
  function text(text = "") {
    if (text) element.textContent = text
    
    return element
  }

  /**
   * Append child nodes to the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("body").append(
   *   document.createElement("header"),
   *   document.createElement("main"),
   *   document.createElement("footer")
   * )
   * 
   * @param  {...any} eles list of nodes
   * @returns {any} element
   */
  function append(...eles) {
    if (eles.length) element.append(...eles)
    
    return element
  }

  /**
   * Prepend child nodes to the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("main").prepend(
   *   document.createElement("div"),
   *   document.createElement("aside"),
   * )
   * 
   * @param  {...any} eles list of nodes
   * @returns {any} element
   */
  function prepend(...eles) {
    if (eles.length) element.prepend(...eles)
    
    return element
  }

  /**
   * Add classes to the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("#main").addClass("d-flex flex-column justify-content-between align-items-center")
   * 
   * @param {String} text Text content to add to the element
   * @returns {any} element
   */
  function addClass(className = "") {
    element.classList.add(...className.split(" "))
    return element
  }

  /**
   * Remve classes to the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("#main").removeClass("d-flex flex-column justify-content-between align-items-center")
   * 
   * @param {String} text Text content to add to the element
   * @returns {any} element
   */
  function removeClass(className = "") {
    element.classList.remove(...className.split(" "))
    return element
  }

  /**
   * Add classes to the element
   * 
   * @since 1.0.0
   * @example Paradox.Element("#main").addClass("d-flex flex-column justify-content-between align-items-center")
   * 
   * @param {String} text Text content to add to the element
   * @returns {any} element
   */
  function attr(attributes = {}) {
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr])
    })
    return element
  }

  return {
    element,
    html,
    text,
    append,
    prepend,
    addClass,
    removeClass,
    attr
  }
}