import { FocusScope, FocusScopeIterator } from "./useFocusScope";
import { isFunction, isNil } from "./assertions";

import { ChildScopesOptions } from ".";
import { FocusTarget } from "./focusTarget";
import { useMemo } from "react";

export interface FocusManagerOptions {
    keyProp?: string;
    onFocus?: (targetElement: HTMLElement) => void;
}

export interface FocusManagerHandlers {
    onFocus?: (targetElement: HTMLElement) => void;
    onNotFound?: () => void;
}

export interface FocusManagerScopeOptions extends ChildScopesOptions {
    tabbableOnly?: boolean;
}

export interface FocusManagerIterationOptions {
    canFocus?: (element: HTMLElement) => boolean;
}

export interface FocusManager {
    addTrapFocusToList: (element: HTMLElement) => void;
    focusFirst: (options?: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers) => HTMLElement;
    focusFirstQueryMatch: (query: string, handlers?: FocusManagerScopeOptions & FocusManagerHandlers) => HTMLElement;
    focusKey: (key: string, options?: FocusManagerScopeOptions & FocusManagerHandlers) => HTMLElement;
    focusLast: (options?: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers) => HTMLElement;
    focusNext: (options?: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers) => HTMLElement;
    focusPrevious: (options?: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers) => HTMLElement;
    focusTarget: (key: string, options?: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers) => HTMLElement;
    getActiveElementIndex: (options?: FocusManagerScopeOptions) => number;
    isInScope: (element: HTMLElement, options?: FocusManagerScopeOptions) => boolean;
    trapFocusList: HTMLElement[];
}

abstract class FocusManagerBase {
    protected scope: FocusScope;
    protected keyProp: string;
    protected onFocus: (element: HTMLElement) => void;
    trapFocusList: HTMLElement[];

    constructor(scope: FocusScope, { keyProp, onFocus }: FocusManagerOptions = {}) {
        this.scope = scope;
        this.keyProp = keyProp;
        this.onFocus = onFocus;
        this.trapFocusList = [];
    }

    isInScope(element: HTMLElement, options?: FocusManagerScopeOptions) {
        return this.scope.isInScope(element, options);
    }

    abstract getActiveElementIndex(options?: FocusManagerScopeOptions);

    abstract focusElement(element: HTMLElement, handlers: FocusManagerHandlers);

    addTrapFocusToList(element: HTMLElement) {
        this.trapFocusList.push(element);
    }

    focusFirst({ canFocus, onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers = {}) {
        const iterator = new FocusScopeIterator(this.scope, scopeOptions);

        const element = iterator.firstElement({ acceptElement: canFocus });

        this.focusElement(element, { onFocus, onNotFound });

        return element;
    }

    focusLast({ canFocus, onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers = {}) {
        const iterator = new FocusScopeIterator(this.scope, scopeOptions);

        const element = iterator.lastElement({ acceptElement: canFocus });

        this.focusElement(element, { onFocus, onNotFound });

        return element;
    }

    focusNext({ canFocus, onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers = {}) {
        const from = this.getActiveElementIndex(scopeOptions);

        const iterator = new FocusScopeIterator(this.scope, { from: from !== -1 ? from : undefined, ...scopeOptions });

        const element = iterator.nextElement({ acceptElement: canFocus });

        this.focusElement(element, { onFocus, onNotFound });

        return element;
    }

    focusPrevious({ canFocus, onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers = {}) {
        const from = this.getActiveElementIndex(scopeOptions);

        const iterator = new FocusScopeIterator(this.scope, { from: from !== -1 ? from : undefined, ...scopeOptions });

        const element = iterator.previousElement({ acceptElement: canFocus });

        this.focusElement(element, { onFocus, onNotFound });

        return element;
    }

    focusKey(key: string, { onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerHandlers = {}) {
        const elements = this.scope.getElements(scopeOptions);

        if (isNil(this.keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        const element = elements.find((x: HTMLElement) => x.getAttribute(this.keyProp) === key?.toString());

        this.focusElement(element, { onFocus, onNotFound });

        return element;
    }

    focusTarget(target: string, options?: FocusManagerScopeOptions & FocusManagerIterationOptions & FocusManagerHandlers) {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                return this.focusLast(options);
        }

        return this.focusKey(target, options);
    }

    focusFirstQueryMatch(query: string, { onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerHandlers = {}) {
        const element = this.scope.getElements(scopeOptions).find((x: HTMLElement) => x.textContent?.toLowerCase().startsWith(query));

        this.focusElement(element, { onFocus, onNotFound });

        return element;
    }
}

export class DomFocusManager extends FocusManagerBase implements FocusManager {
    getActiveElementIndex(options?: FocusManagerScopeOptions) {
        return this.scope.getElements(options).indexOf(document.activeElement as HTMLElement);
    }

    focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusManagerHandlers = {}) {
        if (!isNil(element)) {
            if (isFunction(element.focus)) {
                element.focus();

                [onFocus, this.onFocus].forEach(x => {
                    if (!isNil(x)) {
                        x(element);
                    }
                });
            }
        } else {
            if (!isNil(onNotFound)) {
                onNotFound();
            }
        }
    }
}

export const VirtualFocusCssClass = "o-ui-focus";

export class VirtualFocusManager extends FocusManagerBase implements FocusManager {
    getActiveElementIndex(options?: FocusManagerScopeOptions) {
        return this.scope.getElements(options).findIndex((x: HTMLElement) => x.classList.contains(VirtualFocusCssClass));
    }

    focusElement(element: HTMLElement, { onFocus, onNotFound, ...scopeOptions }: FocusManagerScopeOptions & FocusManagerHandlers = {}) {
        if (!isNil(element)) {
            this.scope.getElements(scopeOptions).forEach((x: HTMLElement) => {
                if (x.classList.contains(VirtualFocusCssClass)) {
                    x.classList.remove(VirtualFocusCssClass);
                }
            });

            element.classList.add(VirtualFocusCssClass);

            [onFocus, this.onFocus].forEach(handler => {
                if (!isNil(handler)) {
                    handler(element);
                }
            });
        } else {
            if (!isNil(onNotFound)) {
                onNotFound();
            }
        }
    }

    getActiveElement(options?: FocusManagerScopeOptions) {
        return this.scope.getElements(options).find((x: HTMLElement) => x.classList.contains(VirtualFocusCssClass));
    }
}

////////////////////////

export interface UseFocusManagerOptions extends FocusManagerOptions {
    isVirtual?: boolean;
}

export function useFocusManager(scope: FocusScope, { isVirtual = false, keyProp, onFocus }: UseFocusManagerOptions = {}) {
    return useMemo(() => {
        const options: FocusManagerOptions = { keyProp, onFocus };

        return isVirtual
            ? new VirtualFocusManager(scope, options)
            : new DomFocusManager(scope, options);
    }, [scope, isVirtual, keyProp, onFocus]);
}
