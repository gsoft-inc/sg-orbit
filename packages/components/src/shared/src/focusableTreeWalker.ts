// Inspired from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx.

import { isNil } from "@components/shared";

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

const TabbableExclusions = `${FocusableExclusions}:not([tabindex="-1"])`;

// - A few components like RadioGroup and Listbox implements a roving focus strategy which means some of their "focusable" elements will have a tabindex of "-1".
//   Those elements have to be in the focus scope since the user can navigate between them with the keyboard arrows.
// - Other features like useRestoreFocus only want elements which are "currently" focusable in their scope. It wouldn't make sense to restore the focus on an element which doesn't
//   currently accept focus.
// - This is why we have the "tabbable" option which allow the caller to specify which focus strategy he want to use for the selection.
const TabbableSelector = FocusableElements.join(`${TabbableExclusions},`) + TabbableExclusions;

export interface FocusableOptions {
    tabbable?: boolean;
}

export type CreateFocusableTreeWalkerOptions = FocusableOptions;

export function createFocusableTreeWalker(root: HTMLElement, { tabbable = false }: CreateFocusableTreeWalkerOptions = {}): TreeWalker {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if (isFocusableElement(node as HTMLElement, { rootElement: root, tabbable })) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            }
        }
    );

    return walker;
}

export interface IsFocusableElementOptions extends FocusableOptions {
    rootElement?: HTMLElement;
}

export function isFocusableElement(element: HTMLElement, { rootElement, tabbable = false }: IsFocusableElementOptions = {}) {
    const selector = tabbable ? TabbableSelector : FocusableSelector;

    return element.matches(selector) && isElementVisible(element, rootElement);
}
