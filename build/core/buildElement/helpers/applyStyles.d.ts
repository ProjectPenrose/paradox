type ParadoxStyleKeys = {
    [key: string]: string;
};
/**
 * Applies the given styles to the specified HTML element.
 *
 * @param element - The HTML element to apply the styles to.
 * @param style - The styles to apply, represented as an object with keys and values.
 */
declare function applyStyles(element: HTMLElement, style: ParadoxStyleKeys): void;
export default applyStyles;
