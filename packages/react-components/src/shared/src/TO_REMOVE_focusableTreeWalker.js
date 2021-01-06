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

export function walkFocusableElements(root, onElement, { tabbable, includeRoot = false } = {}) {
    const selector = tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

    if (includeRoot) {
        if (root.matches(selector)) {
            onElement(root, 0);
        }
    }

    root.querySelectorAll(selector).forEach((x, index) => onElement(x, includeRoot ? index + 1 : index));
}
