// Tree walker code have been copied from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx.

import { isNil } from "lodash";

const FOCUSABLE_ELEMENT = [
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

export const FOCUSABLE_ELEMENT_SELECTOR = [...FOCUSABLE_ELEMENT, "[tabindex]"].join(",");

export const TABBABLE_ELEMENT_SELECTOR = [...FOCUSABLE_ELEMENT, "[tabindex]:not([tabindex=\"-1\"])"].join(":not([tabindex=\"-1\"]),");

export function createFocusableTreeWalker(root, from, { tabblable } = {}) {
    const selector = tabblable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if (!isNil(from)) {
                    // Skip nodes inside the starting node.
                    if (from.contains(node)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                }

                if (node.matches(selector)) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            }
        },
        false
    );

    if (!isNil(from)) {
        walker.currentNode = from;
    }

    return walker;
}

export function createNavigableTreeWalker(root, from, options) {
    const walker = createFocusableTreeWalker(root, from, options);

    return {
        first: () => {
            walker.currentNode = root;

            return walker.firstChild();
        },
        next: () => {
            let element = walker.nextNode();

            if (isNil(element)) {
                // Otherwise `firstChild` won't work.
                walker.currentNode = root;
                element = walker.firstChild();
            }

            return element;
        },
        previous: () => {
            let element = walker.previousNode();

            if (isNil(element)) {
                // Otherwise `lastChild` won't work.
                walker.currentNode = root;
                element = walker.lastChild();
            }

            return element;
        },
        last: () => {
            walker.currentNode = root;

            return walker.lastChild();
        }
    };
}

export function walkFocusableElements(root, onElement, { tabblable, includeRoot = false } = {}) {
    const selector = tabblable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

    if (includeRoot) {
        if (root.matches(selector)) {
            onElement(root, 0);
        }
    }

    root.querySelectorAll(selector).forEach((x, index) => onElement(x, includeRoot ? index + 1 : index));
}
