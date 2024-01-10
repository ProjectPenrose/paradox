// List of boolean attributes that need special handling
const booleanAttributes = [
  "disabled",
  "checked",
  "selected",
  "readonly",
  "required",
  "multiple",
  "autofocus",
  "formnovalidate",
  "autocompleted",
];

function setAttributes(element: HTMLElement, attributes: { [key: string]: string }) {
  for (const [key, value] of Object.entries(attributes)) {
    // Attributes like disabled, checked, selected need special handling
    if (booleanAttributes.includes(key)) {
      if (value) element.setAttribute(key, String(value));
    }
    else element.setAttribute(key, String(value));
  }
}

export default setAttributes;