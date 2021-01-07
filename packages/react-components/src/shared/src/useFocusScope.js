import { useCallback, useMemo, useRef } from "react";

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

const FocusableElementSelector = [...FocusableElement, "[tabindex]"].join(",");

function walkFocusableElements(root, onElement) {
    root.querySelectorAll(FocusableElementSelector).forEach((x, index) => onElement(x, index));
}

class DomScope {
    _scopeRef;
    _changeHandlersRef;

    constructor(scopeRef, changeHandlersRef) {
        this._scopeRef = scopeRef;
        this._changeHandlersRef = changeHandlersRef;
    }

    get elements() {
        return this._scopeRef.current;
    }

    registerChangeHandler(handler) {
        this._changeHandlersRef.current.push(handler);
    }

    removeChangeHandler(handler) {
        const handlers = this._changeHandlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    isInScope(element) {
        return this.elements.some(x => x.contains(element));
    }
}

export function useFocusScope() {
    const scopeRef = useRef([]);
    const changeHandlersRef = useRef([]);

    const setRef = useCallback(rootElement => {
        const setElements = elements => {
            changeHandlersRef.current.forEach(x => {
                x(elements, scopeRef.current);
            });

            scopeRef.current = elements;
        };

        const parseElements = () => {
            const scope = [];

            walkFocusableElements(rootElement, x => {
                scope.push(x);
            });

            setElements(scope);
        };

        // Watch for dynamic elements.
        const mutationObserver = new MutationObserver(() => {
            parseElements();
        });

        if (rootElement) {
            // Parse initial elements.
            parseElements();

            mutationObserver.observe(rootElement, {
                subtree: true,
                childList: true
            });
        } else {
            mutationObserver.disconnect();
            setElements([]);
        }
    }, [scopeRef]);

    const scope = useMemo(() => new DomScope(scopeRef, changeHandlersRef), [scopeRef, changeHandlersRef]);

    return [scope, setRef];
}
