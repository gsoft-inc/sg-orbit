// Inspired from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx.

import { isNil } from "@components/shared";

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
    "[contenteditable]",
    "[tabindex]:not([disabled])"
];

const FocusableExclusions = ":not([hidden]):not([aria-hidden=\"true\"]):not([tabindex=\"-1\"])";

const FocusableSelector = FocusableElements.join(`${FocusableExclusions},`) + FocusableExclusions;

function isStyleVisible(element: Element) {
    if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
        return false;
    }

    const { display, visibility } = element.style;

    if (display === "none" ||
        visibility === "hidden" ||
        visibility === "collapse") {
        return false;
    }

    const { getComputedStyle } = element.ownerDocument.defaultView;
    const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);

    if (computedDisplay === "none" ||
        computedVisibility === "hidden" ||
        computedVisibility === "collapse") {
        return false;
    }

    return true;
}

// Even if these attributes are handled by the focusable selector, we still have to validate them for the parent elements.
function isAttributeVisible(element: Element) {
    return !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true";
}

function isParentElementVisible(element: Element, rootElement?: Element) {
    const parentElement = element.parentElement;

    if (!isNil(parentElement)) {
        // Stop recursion at the root element.
        // Do not support invisible root element, doesn't make sense for our use cases.
        if (parentElement !== rootElement) {
            return isElementVisible(parentElement, rootElement);
        }
    }

    return true;
}

// The focusable selector doesn't handle elements visibility and the parent elements. Therefore we must validate in JS.
function isElementVisible(element: Element, rootElement?: Element) {
    if (isNil(element)) {
        return false;
    }

    return element.nodeName !== "#comment" &&
        isStyleVisible(element) &&
        isAttributeVisible(element) &&
        isParentElementVisible(element, rootElement);
}

export function createFocusableTreeWalker(root: HTMLElement): TreeWalker {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if (isFocusableElement(node as HTMLElement, root)) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            }
        }
    );

    return walker;
}

export function isFocusableElement(element: HTMLElement, rootElement?: HTMLElement) {
    return element.matches(FocusableSelector) && isElementVisible(element, rootElement);
}

// // TODO: rename to iterateAllFocusableElements?
// // TODO: maybe use createFocusableTreeWalker in focusScope instead and remove this function?!?!
// // TODO: if it's kept, add Jest tests
// // TODO: Laurent said the the return snapshot might differ between walkFocusableElements and createFocusableTreeWalker. It might be why FocusScope is still using walkFocusableElements
// export function walkFocusableElements(root: HTMLElement, onElement: (element: Element, index?: number) => void): void {
//     if (root.matches(FocusableElementSelector)) {
//         onElement(root, 0);
//     }

//     root.querySelectorAll(FocusableElementSelector).forEach((x, index) => onElement(x, index + 1));
// }
