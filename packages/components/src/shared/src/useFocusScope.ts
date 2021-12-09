import { RefObject, useCallback, useMemo } from "react";
import { createFocusableTreeWalker, isFocusableElement } from "./focusableTreeWalker";

import { isNil } from "./assertions";
import { useRefState } from "./useRefState";

export type ScopeChangeEventHandler = (newScope: HTMLElement[], previousScope: HTMLElement[]) => void;

export class DomScope {
    private scopeRef: RefObject<HTMLElement[]>;
    private handlersRef: RefObject<ScopeChangeEventHandler[]>;

    constructor(scopeRef: RefObject<HTMLElement[]>, handlersRef: RefObject<ScopeChangeEventHandler[]>) {
        this.scopeRef = scopeRef;
        this.handlersRef = handlersRef;
    }

    get elements() {
        return this.scopeRef.current;
    }

    registerChangeHandler(handler: ScopeChangeEventHandler) {
        this.handlersRef.current.push(handler);
    }

    removeChangeHandler(handler: ScopeChangeEventHandler) {
        const handlers = this.handlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    isInScope(element: HTMLElement) {
        return this.elements.some(x => x.contains(element));
    }
}

export function useFocusScope(): [DomScope, (rootElement: HTMLElement) => void] {
    const [scopeRef, setScope] = useRefState<HTMLElement[]>([]);
    const [handlersRef] = useRefState<ScopeChangeEventHandler[]>([]);

    const setRef = useCallback((rootElement: HTMLElement) => {
        const setElements = (elements: HTMLElement[]) => {
            handlersRef.current.forEach(x => {
                x(elements, scopeRef.current);
            });

            setScope(elements);
        };

        const parseElements = () => {
            const scope: HTMLElement[] = [];

            const walker = createFocusableTreeWalker(rootElement);

            // Skip the root element since it's filtered by the tree walker.
            let currentNode = walker.firstChild();

            while (!isNil(currentNode)) {
                scope.push(currentNode as HTMLElement);

                currentNode = walker.nextNode();
            }

            if (isFocusableElement(rootElement)) {
                scope.unshift(rootElement);
            }

            setElements(scope);
        };

        // Watch for dynamic elements or visibility changes for an element.
        const mutationObserver = new MutationObserver(() => {
            parseElements();
        });

        if (rootElement) {
            // Parse initial elements.
            parseElements();

            mutationObserver.observe(rootElement, {
                attributeFilter: ["style", "class", "hidden", "aria-hidden"],
                attributes: true,
                childList: true,
                subtree: true
            });
        } else {
            mutationObserver.disconnect();
            // HACK: It's probably not a good idea to comment this cleanup code but it's currently the only way
            // for restore focus to work.
            // setElements([]);
        }
    }, [scopeRef, setScope, handlersRef]);

    const scope = useMemo(() => new DomScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    return [scope, setRef];
}
