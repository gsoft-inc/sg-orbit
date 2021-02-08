// Tree walker code have been copied from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx.

const FocusableElement = [
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

export const FocusableElementSelector = [...FocusableElement, "[tabindex]"].join(",");

export const TabbableElementSelector = [...FocusableElement, "[tabindex]:not([tabindex=\"-1\"])"].join(":not([tabindex=\"-1\"]),");

interface FocusableTreeWalkerOptions {
    tabbable?: boolean;
}

export function createFocusableTreeWalker(root: HTMLElement, { tabbable }: FocusableTreeWalkerOptions = {}) {
    const selector = tabbable ? TabbableElementSelector : FocusableElementSelector;

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                if ((node as HTMLElement).matches(selector)) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            }
        },
        false
    );

    return walker;
}

export function walkFocusableElements(root: HTMLElement, onElement: (element: Element, index?: number) => void) {
    root.querySelectorAll(FocusableElementSelector).forEach((x, index) => onElement(x, index));
}
