import getStyleKey from './getStyleKey';

function applyStyles(element: HTMLElement, style: { [key: string]: string }) {
  const styleDeclaration: CSSStyleDeclaration = element.style;
  // Apply inline style to the element by converting keys from camelCase
  for (const [key, value] of Object.entries(style)) {
    const styleKey = getStyleKey(key) as string;
    styleDeclaration.setProperty(styleKey, value as string);
  }
}

export default applyStyles;