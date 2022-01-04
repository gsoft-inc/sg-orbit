import { RefObject, createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { createFocusableTreeWalker, isFocusableElement } from "./focusableTreeWalker";

import { isNil } from "./assertions";
import { useRefState } from "./useRefState";

export interface ChildScopesOptions {
    includeChildScopes?: boolean;
}

export type ScopeChangeEventHandler = (newElements: HTMLElement[], previousElements: HTMLElement[]) => void;

export class FocusScope {
    private scopeRef: RefObject<HTMLElement[]>;
    private handlersRef: RefObject<ScopeChangeEventHandler[]>;
    private childScopes: Set<FocusScope>;

    constructor(scopeRef: RefObject<HTMLElement[]>, handlersRef: RefObject<ScopeChangeEventHandler[]>) {
        this.scopeRef = scopeRef;
        this.handlersRef = handlersRef;
        this.childScopes = new Set();
    }

    getElements({ includeChildScopes = false }: ChildScopesOptions = {}) {
        if (!includeChildScopes || this.childScopes.size === 0) {
            return this.scopeRef.current;
        }

        const elements = new Set(this.scopeRef.current);

        this.childScopes.forEach(x => {
            const children = x.getElements({ includeChildScopes: true });

            children.forEach(y => {
                elements.add(y);
            });
        });

        return Array.from(elements);
    }

    registerChangeHandler(handler: ScopeChangeEventHandler) {
        this.handlersRef.current.push(handler);
    }

    removeChangeHandler(handler: ScopeChangeEventHandler) {
        const handlers = this.handlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    registerChildScope(scope: FocusScope) {
        this.childScopes.add(scope);
    }

    removeChildScope(scope: FocusScope) {
        return this.childScopes.delete(scope);
    }

    isInScope(element: HTMLElement, { includeChildScopes = false }: ChildScopesOptions = {}) {
        if (isNil(element)) {
            return false;
        }

        const hasElement = this.getElements().some(x => x.contains(element));

        if (includeChildScopes && !hasElement) {
            return Array.from(this.childScopes).some(x => x.isInScope(element));
        }

        return hasElement;
    }
}

export interface FocusScopeContextType {
    scope?: FocusScope;
}

// Use a FocusScopeContext if you need to manage a hierarchy of focus scopes.
// For example, a modal component could contains other overlay components like a select or an autocomplete.
// These overlay components contained by the modal are all rendered with Portal and therefore aren't included in the focus scope of the modal.
// Focusing them will result in unwanted behaviors like closing the modal when any of these child overlay components receive focus.
// To fix this, we use a FocusScopeContext. All the different hooks which manage the focus will detect the existence of a FocusScopeContext and will automatically
// registered their scope (the scope of the overlay componented contained in the modal) to their parent scope.
// This will create a hierarchy of scopes.
// By knowing the hierarchy of scopes, a component like a modal will be able to understand the focus have been moved to an element included in one of his nested overlay components
// and therefore will behave expectedly.
export const FocusScopeContext = createContext<FocusScopeContextType>(undefined);

export function useFocusScopeContext(): [FocusScopeContextType, boolean] {
    const context = useContext(FocusScopeContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [{}, false];
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

            let currentNode = walker.firstChild();

            while (!isNil(currentNode)) {
                scope.push(currentNode as HTMLElement);

                currentNode = walker.nextNode();
            }

            // Add the root element if focusable.
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
                attributeFilter: ["style", "class", "hidden"],
                attributes: true,
                childList: true,
                subtree: true
            });
        } else {
            mutationObserver.disconnect();
        }
    }, [scopeRef, setScope, handlersRef]);

    const scope = useMemo(() => new FocusScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    const [{ scope: parentScope }] = useFocusScopeContext();

    // Support focus hierarchy for dialog components.
    // The main use case is a component like a Select in a modal component.
    useEffect(() => {
        if (!isNil(parentScope)) {
            parentScope.registerChildScope(scope);

            return () => {
                parentScope.removeChildScope(scope);
            };
        }
    }, [scope, parentScope]);

    return [scope, setRef];
}

////////////////////

export interface FocusScopeIteratorOptions extends ChildScopesOptions {
    from?: number;
    tabbableOnly?: boolean;
}

export interface FocusScopeIterationOptions {
    acceptElement?: (element: HTMLElement) => boolean;
}

export class FocusScopeIterator {
    private currentIndex: number;
    private includeChildScopes: boolean;
    private scope: FocusScope;
    private tabbableOnly: boolean;

    constructor(scope: FocusScope, { from, includeChildScopes, tabbableOnly = false }: FocusScopeIteratorOptions = {}) {
        this.currentIndex = from;
        this.includeChildScopes = includeChildScopes;
        this.scope = scope;
        this.tabbableOnly = tabbableOnly;
    }

    private isValid(element: HTMLElement) {
        return this.tabbableOnly ? element.getAttribute("tabindex") !== "-1" : true;
    }

    firstElement({ acceptElement = () => true }: FocusScopeIterationOptions = {}) {
        const elements = this.scope.getElements({ includeChildScopes: this.includeChildScopes });

        if (elements.length === 0) {
            return null;
        }

        this.currentIndex = -1;

        let current: HTMLElement;

        do {
            current = elements[++this.currentIndex];

            if (!isNil(current)) {
                if (this.isValid(current)) {
                    if (acceptElement(current)) {
                        // We found the element, stop the loop.
                        break;
                    }
                }
            }

            // Continue to the next element.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (this.currentIndex > elements.length - 1) {
                break;
            }
        } while (isNil(current));

        return current;
    }

    lastElement({ acceptElement = () => true }: FocusScopeIterationOptions = {}) {
        const elements = this.scope.getElements({ includeChildScopes: this.includeChildScopes });

        if (elements.length === 0) {
            return null;
        }

        this.currentIndex = elements.length;

        let current: HTMLElement;

        do {
            current = elements[--this.currentIndex];

            if (!isNil(current)) {
                if (this.isValid(current)) {
                    if (acceptElement(current)) {
                        // We found the element, stop the loop.
                        break;
                    }
                }
            }

            // Continue to the next element.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (this.currentIndex < 0) {
                break;
            }
        } while (isNil(current));

        return current;
    }

    nextElement({ acceptElement = () => true }: FocusScopeIterationOptions = {}) {
        const elements = this.scope.getElements({ includeChildScopes: this.includeChildScopes });

        if (elements.length === 0) {
            return null;
        }

        const startingIndex = this.currentIndex = this.currentIndex ?? -1;

        let current: HTMLElement;

        do {
            current = elements[++this.currentIndex];

            if (isNil(current)) {
                // Hit the end of the loop, reset the index.
                this.currentIndex = -1;
            } else {
                if (this.isValid(current)) {
                    if (acceptElement(current)) {
                        // We found the element, stop the loop.
                        break;
                    }
                }
            }

            // Continue to the next element.
            current = null;

            // Guard to ensure we don't go in an infinite loop because there are no valid elements.
            // Ex. We only want tabbable elements but there are none in the current scope.
            if (startingIndex === this.currentIndex) {
                break;
            }
        } while (isNil(current));

        return current;
    }

    previousElement({ acceptElement = () => true }: FocusScopeIterationOptions = {}) {
        const elements = this.scope.getElements({ includeChildScopes: this.includeChildScopes });

        if (elements.length === 0) {
            return null;
        }

        const startingIndex = this.currentIndex = this.currentIndex ?? elements.length;

        let current: HTMLElement;

        do {
            current = elements[--this.currentIndex];

            if (isNil(current)) {
                // Hit the end of the loop, reset the index.
                this.currentIndex = elements.length;
            } else {
                if (this.isValid(current)) {
                    if (acceptElement(current)) {
                        // We found the element, stop the loop.
                        break;
                    }
                }
            }

            // Continue to the next element.
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
