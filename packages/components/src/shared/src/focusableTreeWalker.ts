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

function isContentNode(element: Element) {
    return element.nodeName !== "#comment";
}

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

// Even if these attributes are dealt with in the focusable elements selector, we still must check them for parents elements.
function isAttributeVisible(element: Element) {
    if (element.hasAttribute("hidden")) {
        return false;
    }

    if (element.getAttribute("aria-hidden") === "true") {
        return false;
    }

    return true;
}

function isParentElementVisible(element: Element) {
    return !isNil(element.parentElement)
        ? isElementVisible(element.parentElement)
        : true;
}

export function isElementVisible(element: Element) {
    if (isNil(element)) {
        return false;
    }

    return isContentNode(element) &&
        isStyleVisible(element) &&
        isAttributeVisible(element) &&
        isParentElementVisible(element);
}

export function createFocusableTreeWalker(root: HTMLElement): TreeWalker {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if (isFocusableElement(node as HTMLElement)) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            }
        }
    );

    return walker;
}

export function isFocusableElement(element: HTMLElement) {
    return element.matches(FocusableSelector) && isElementVisible(element);
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
