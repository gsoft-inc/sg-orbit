import { RefObject, useCallback, useMemo } from "react";
import { createFocusableTreeWalker, isFocusableElement } from "./focusableTreeWalker";

import { isNil } from "./assertions";
import { useRefState } from "./useRefState";

export interface IteratorOptions {
    from?: number;
    tabbableOnly?: boolean;
}

export interface IterationOptions {
    accept?: (element: HTMLElement) => boolean;
}

export class FocusScopeIterator {
    private scope: FocusScope;
    private tabbableOnly: boolean;
    private currentIndex: number;

    constructor(scope: FocusScope, { from, tabbableOnly = false }: IteratorOptions = {}) {
        this.scope = scope;
        this.tabbableOnly = tabbableOnly;
        this.currentIndex = from;
    }

    private isValid(element: HTMLElement) {
        return this.tabbableOnly ? element.getAttribute("tabindex") !== "-1" : true;
    }

    firstElement({ accept = () => true }: IterationOptions = {}) {
        const { elements } = this.scope;

        if (elements.length === 0) {
            return null;
        }

        this.currentIndex = -1;

        let current;

        do {
            current = elements[++this.currentIndex];

            if (!isNil(current)) {
                if (accept(current) && this.isValid(current)) {
                    // We found the element, stop the loop.
                    break;
                }
            }

            // Continue to the next one.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (this.currentIndex > elements.length - 1) {
                break;
            }
        } while (isNil(current));

        return current;
    }

    lastElement({ accept = () => true }: IterationOptions = {}) {
        const { elements } = this.scope;

        if (elements.length === 0) {
            return null;
        }

        this.currentIndex = elements.length;

        let current;

        do {
            current = elements[--this.currentIndex];

            if (!isNil(current)) {
                if (accept(current) && this.isValid(current)) {
                    // We found the element, stop the loop.
                    break;
                }
            }

            // Continue to the next one.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (this.currentIndex < 0) {
                break;
            }
        } while (isNil(current));

        return current;
    }

    nextElement({ accept = () => true }: IterationOptions = {}) {
        const { elements } = this.scope;

        if (elements.length === 0) {
            return null;
        }

        const startingIndex = this.currentIndex = this.currentIndex ?? -1;

        let current;

        do {
            current = elements[++this.currentIndex];

            if (isNil(current)) {
                // Hit the end of the loop, reset the index.
                this.currentIndex = -1;
            } else {
                if (accept(current) && this.isValid(current)) {
                    // We found the element, stop the loop.
                    break;
                }
            }

            // Continue to the next one.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (startingIndex === this.currentIndex) {
                break;
            }
        } while (isNil(current));

        return current;
    }

    previousElement({ accept = () => true }: IterationOptions = {}) {
        const { elements } = this.scope;

        if (elements.length === 0) {
            return null;
        }

        const startingIndex = this.currentIndex = this.currentIndex ?? elements.length;

        let current;

        do {
            current = elements[--this.currentIndex];

            if (isNil(current)) {
                // Hit the end of the loop, reset the index.
                this.currentIndex = elements.length;
            }
            else {
                if (accept(current) && this.isValid(current)) {
                    // We found the element, stop the loop.
                    break;
                }
            }

            // Continue to the next one.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (startingIndex === this.currentIndex) {
                break;
            }
        } while (isNil(current));

        return current;
    }
}

////////////////////

export type ScopeChangeEventHandler = (newElements: HTMLElement[], previousElements: HTMLElement[]) => void;

// ********
// TODO: add a focus scope root prop -> The root element should probably not be in the scope elements but instead available
// has a distinct prop
// ********

export class FocusScope {
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
        return !isNil(element) && this.elements.some(x => x.contains(element));
    }
}

export function useFocusScope(): [FocusScope, (rootElement: HTMLElement) => void] {
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

            if (isFocusableElement(rootElement, { rootElement: rootElement.parentElement })) {
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

    const scope = useMemo(() => new FocusScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    return [scope, setRef];
}
