import { FocusScope, FocusScopeIterator } from "./useFocusScope";
import { isFunction, isNil } from "./assertions";

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

export interface FocusMethodOptions extends FocusManagerHandlers {
    canFocus?: (element: HTMLElement) => boolean;
    tabbableOnly?: boolean;
}

export interface FocusManager {
    focusFirst: (options?: FocusMethodOptions) => HTMLElement;
    focusFirstQueryMatch: (query: string, handlers?: FocusManagerHandlers) => HTMLElement;
    focusKey: (key: string, handlers?: FocusManagerHandlers) => HTMLElement;
    focusLast: (options?: FocusMethodOptions) => HTMLElement;
    focusNext: (options?: FocusMethodOptions) => HTMLElement;
    focusPrevious: (options?: FocusMethodOptions) => HTMLElement;
    focusTarget: (key: string, options?: FocusMethodOptions) => HTMLElement;
    isInScope: (element: HTMLElement) => boolean;
    scopeElements: HTMLElement[];
}

abstract class FocusManagerBase {
    protected scope: FocusScope;
    protected keyProp: string;
    protected onFocus: (element: HTMLElement) => void;

    constructor(scope: FocusScope, { keyProp, onFocus }: FocusManagerOptions = {}) {
        this.scope = scope;
        this.keyProp = keyProp;
        this.onFocus = onFocus;
    }

    get scopeElements() {
        return this.scope.elements;
    }

    isInScope(element: HTMLElement) {
        return this.scope.isInScope(element);
    }

    protected abstract getActiveElementIndex();

    protected abstract focusElement(element: HTMLElement, handlers: FocusManagerHandlers);

    focusFirst({ canFocus, tabbableOnly, ...options }: FocusMethodOptions = {}) {
        const iterator = new FocusScopeIterator(this.scope, { tabbableOnly });

        const element = iterator.firstElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusLast({ canFocus, tabbableOnly, ...options }: FocusMethodOptions = {}) {
        const iterator = new FocusScopeIterator(this.scope, { tabbableOnly });

        const element = iterator.lastElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusNext({ canFocus, tabbableOnly, ...options }: FocusMethodOptions = {}) {
        const from = this.getActiveElementIndex();

        const iterator = new FocusScopeIterator(this.scope, { from: from !== -1 ? from : undefined, tabbableOnly });

        const element = iterator.nextElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusPrevious({ canFocus, tabbableOnly, ...options }: FocusMethodOptions = {}) {
        const from = this.getActiveElementIndex();

        const iterator = new FocusScopeIterator(this.scope, { from: from !== -1 ? from : undefined, tabbableOnly });

        const element = iterator.previousElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusKey(key: string, handlers?: FocusManagerHandlers) {
        const { elements } = this.scope;

        if (isNil(this.keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        const element = elements.find((x: HTMLElement) => x.getAttribute(this.keyProp) === key?.toString());

        this.focusElement(element, handlers);

        return element;
    }

    focusTarget(target: string, options?: FocusMethodOptions) {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                return this.focusLast(options);
        }

        return this.focusKey(target, options);
    }

    focusFirstQueryMatch(query: string, options?: FocusManagerHandlers) {
        const { elements } = this.scope;

        const element = elements.find((x: HTMLElement) => x.textContent?.toLowerCase().startsWith(query));

        this.focusElement(element, options);

        return element;
    }
}

export class DomFocusManager extends FocusManagerBase implements FocusManager {
    protected getActiveElementIndex() {
        const { elements } = this.scope;

        return elements.indexOf(document.activeElement as HTMLElement);
    }

    protected focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusManagerHandlers = {}) {
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
    protected getActiveElementIndex() {
        const { elements } = this.scope;

        return elements.findIndex((x: HTMLElement) => x.classList.contains(VirtualFocusCssClass));
    }

    protected focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusManagerHandlers = {}) {
        if (!isNil(element)) {
            const { elements } = this.scope;

            elements.forEach((x: HTMLElement) => {
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

    getActiveElement() {
        const { elements } = this.scope;

        return elements.find((x: HTMLElement) => x.classList.contains(VirtualFocusCssClass));
    }
}

////////////////////////////////////////////////

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
