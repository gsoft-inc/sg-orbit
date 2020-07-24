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

const FOCUSABLE_ELEMENT_SELECTOR = FOCUSABLE_ELEMENT.join(",") + ",[tabindex]";

export function createFocusableTreeWalker(root, from) {
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

                if (node.matches(FOCUSABLE_ELEMENT_SELECTOR)) {
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

export function createNavigationTreeWalker(root, from) {
    const walker = createFocusableTreeWalker(root, from);

    return {
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
        }
    };
}

export function getNextNavigableElement(root, currentElement) {
    const walker = createNavigationTreeWalker(root, currentElement);

    return walker.next();
}

export function getPreviousNavigableElement(root, currentElement) {
    const walker = createNavigationTreeWalker(root, currentElement);

    return walker.previous();
}
