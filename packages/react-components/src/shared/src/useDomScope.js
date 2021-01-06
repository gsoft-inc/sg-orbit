import { useCallback, useMemo, useRef } from "react";

class DomScope {
    _scopeRef;

    constructor(scopeRef) {
        this._scopeRef = scopeRef;
    }

    get elements() {
        return this._scopeRef.current;
    }

    isInScope(element) {
        return this._scopeRef.current.elements.some(x => x.contains(element));
    }
}

export function useDomScope({ tabbable } = {}) {
    const scopeRef = useRef([]);

    const setRef = useCallback(rootElement => {
        if (rootElement) {
            const elements = [];

            walkFocusableElements(
                rootElement,
                x => { elements.push(x); },
                { tabbable }
            );

            scopeRef.current = elements;
        } else {
            scopeRef.current = [];
        }
    }, [scopeRef, tabbable]);

    const scope = useMemo(() => new DomScope(scopeRef), [scopeRef]);

    return [scope, setRef];
}

///////////////////

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
