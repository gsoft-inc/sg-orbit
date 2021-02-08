import { createContext, RefObject, useCallback, useContext, useMemo } from "react";
import { isNil } from "lodash";
import { useRefState } from "./useRefState";
import { walkFocusableElements } from "./focusableTreeWalker";

export interface FocusScope {
    elements: HTMLElement[];
    isInScope: (element: HTMLElement) => boolean;
    registerChangeHandler: (onChangeHandler: (newElements: HTMLElement[], oldElements: HTMLElement[]) => void) => void;
    removeChangeHandler: (onChangeHandler: (newElements: HTMLElement[], oldElements: HTMLElement[]) => void) => void;
}

class DomScope<T extends HTMLElement> {
    _scopeRef: RefObject<T[]>;
    _handlersRef: RefObject<((elements: T[], scope: T[]) => void)[]>;

    constructor(scopeRef: RefObject<T[]>, handlersRef: RefObject<((elements: T[], scope: T[]) => void)[]>) {
        this._scopeRef = scopeRef;
        this._handlersRef = handlersRef;
    }

    get elements() {
        return this._scopeRef.current;
    }

    registerChangeHandler(handler: ((elements: T[], scope: T[]) => void)) {
        this._handlersRef.current.push(handler);
    }

    removeChangeHandler(handler: ((elements: T[], scope: T[]) => void)) {
        const handlers = this._handlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    isInScope(element: T) {
        return this.elements.some(x => x.contains(element));
    }
}

export function useFocusScope() {
    const [scopeRef, setScope] = useRefState<HTMLElement[]>([]);
    const [handlersRef] = useRefState<((elements: Element[], scope: Element[]) => void)[]>([]);

    const setRef = useCallback(rootElement => {
        const setElements = (elements: HTMLElement[]) => {
            handlersRef.current.forEach(x => {
                x(elements, scopeRef.current);
            });

            setScope(elements);
        };

        const parseElements = () => {
            const scope: HTMLElement[] = [];

            walkFocusableElements(rootElement, x => {
                scope.push(x as HTMLElement);
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

    const scope: FocusScope = useMemo(() => new DomScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    const { scope: contextScope } = useFocusContext();

    return isNil(contextScope)
        ? [scope, setRef] as const
        : [contextScope, undefined] as const;
}

interface FocusContextProps {
    scope?: FocusScope
}

export const FocusContext = createContext<FocusContextProps>({});

export function useFocusContext() {
    return useContext(FocusContext) ?? {};
}
