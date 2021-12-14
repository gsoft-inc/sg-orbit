// Inspired from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx.

import { isNil } from "./assertions";

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

// Even if those attributes are handled by the focusable selector, we still have to validate them for the parent elements.
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

const FocusableExclusions = ":not([hidden]):not([aria-hidden=\"true\"])";

const FocusableSelector = FocusableElements.join(`${FocusableExclusions},`) + FocusableExclusions;

export interface FocusOptions {
    acceptElement?: (element: HTMLElement) => boolean;
}

export type CreateFocusableTreeWalkerOptions = FocusOptions;

export function createFocusableTreeWalker(root: HTMLElement, { acceptElement = () => true }: CreateFocusableTreeWalkerOptions = {}): TreeWalker {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if (isFocusableElement(node as HTMLElement, { rootElement: root })) {
                    if (acceptElement(node as HTMLElement)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }

                return NodeFilter.FILTER_SKIP;
            }
        }
    );

    return walker;
}

export interface IsFocusableElementOptions {
    rootElement?: HTMLElement;
}

export function isFocusableElement(element: HTMLElement, { rootElement }: IsFocusableElementOptions = {}) {
    return element.matches(FocusableSelector) && isElementVisible(element, rootElement);
}
