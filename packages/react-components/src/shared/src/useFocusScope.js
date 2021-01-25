import { createContext, useCallback, useContext, useMemo } from "react";
import { isNil } from "lodash";
import { useRefState } from "./useRefState";
import { walkFocusableElements } from "./focusableTreeWalker";

class DomScope {
    _scopeRef;
    _handlersRef;

    constructor(scopeRef, handlersRef) {
        this._scopeRef = scopeRef;
        this._handlersRef = handlersRef;
    }

    get elements() {
        return this._scopeRef.current;
    }

    registerChangeHandler(handler) {
        this._handlersRef.current.push(handler);
    }

    removeChangeHandler(handler) {
        const handlers = this._handlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    isInScope(element) {
        return this.elements.some(x => x.contains(element));
    }
}

export function useFocusScope() {
    const [scopeRef, setScope] = useRefState([]);
    const [handlersRef] = useRefState([]);

    const setRef = useCallback(rootElement => {
        const setElements = elements => {
            handlersRef.current.forEach(x => {
                x(elements, scopeRef.current);
            });

            setScope(elements);
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
    }, [scopeRef, setScope, handlersRef]);

    const scope = useMemo(() => new DomScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    const { scope: contextScope } = useFocusContext();

    return isNil(contextScope)
        ? [scope, setRef]
        : [contextScope, undefined];
}

export const FocusContext = createContext({});

export function useFocusContext() {
    return useContext(FocusContext) ?? {};
}
