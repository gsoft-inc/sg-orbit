// Tree walker code have been copied from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx.

const FocusableElements = [
    "input:not([disabled]):not([type=hidden])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "a[href]",
    "area[href]",
    "summary",
    "iframe",
    "object",
    "embed",
    "audio[controls]",
    "video[controls]",
    "[contenteditable]"
];

export const FocusableElementSelector = FocusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
FocusableElements.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");

export const TabbableElementSelector = FocusableElements.join(":not([hidden]):not([tabindex=\"-1\"]),");

export interface FocusableTreeWalkerOptions {
    tabbable?: boolean;
}

function isStyleVisible(element: Element) {
    if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
        return false;
    }

    const { display, visibility } = element.style;

    let isVisible = (
        display !== "none" &&
        visibility !== "hidden" &&
        visibility !== "collapse"
    );

    if (isVisible) {
        const { getComputedStyle } = element.ownerDocument.defaultView;
        const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);

        isVisible = (
            computedDisplay !== "none" &&
            computedVisibility !== "hidden" &&
            computedVisibility !== "collapse"
        );
    }

    return isVisible;
}

function isAttributeVisible(element: Element, childElement?: Element) {
    return (
        !element.hasAttribute("hidden") &&
        (element.nodeName === "DETAILS" &&
            childElement &&
            childElement.nodeName !== "SUMMARY"
            ? element.hasAttribute("open")
            : true)
    );
}

function isElementVisible(element: Element, childElement?: Element) {
    return (
        element.nodeName !== "#comment" &&
        isStyleVisible(element) &&
        isAttributeVisible(element, childElement) &&
        (!element.parentElement || isElementVisible(element.parentElement, element))
    );
}

export function createFocusableTreeWalker(root: HTMLElement, { tabbable }: FocusableTreeWalkerOptions = {}): TreeWalker {
    const selector = tabbable ? TabbableElementSelector : FocusableElementSelector;

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if ((node as HTMLElement).matches(selector) && isElementVisible(node as HTMLElement)) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            }
        }
    );

    return walker;
}


export function walkFocusableElements(root: HTMLElement, onElement: (element: Element, index?: number) => void): void {
    if (root.matches(FocusableElementSelector)) {
        onElement(root, 0);
    }

    root.querySelectorAll(FocusableElementSelector).forEach((x, index) => onElement(x, index + 1));
}
