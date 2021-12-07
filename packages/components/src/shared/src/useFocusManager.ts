import { DomScope } from "./useFocusScope";
import { FocusTarget } from "./focusTarget";
import { createFocusableTreeWalker } from "../../shared";
import { isFunction, isNil } from "./assertions";
import { useMemo } from "react";

export const VirtualFocusCssClass = "o-ui-focus";

export class ElementIterator<T> {
    private elements;
    private index;

    constructor(elements: T[], { from = -1 } = {}) {
        this.elements = elements;
        this.index = from;
    }

    next() {
        if (this.index < this.elements.length - 1) {
            return this.elements[++this.index];
        }

        return null;
    }

    previous() {
        if (this.index > 0) {
            return this.elements[--this.index];
        }

        return null;
    }

    reset({ from = -1 } = {}) {
        this.index = from;
    }

    get currentIndex() {
        return this.index;
    }
}

export interface FocusManagerOptions {
    isVirtual?: boolean;
    keyProp?: string;
    onFocus?: (activeElement: HTMLElement, options: Omit<FocusManagerOptions, "onFocus">) => void;
}

export interface FocusOptions {
    canFocus?: (element: HTMLElement) => boolean;
    onFocus?: (activeElement: HTMLElement, options: Omit<FocusManagerOptions, "onFocus">) => void;
    onNotFound?: (options: Omit<FocusManagerOptions, "onFocus">) => void;
}

export class FocusManager {
    private scope;
    private isVirtual;
    private keyProp;
    private onFocus;

    constructor(scope: DomScope, { isVirtual = false, keyProp, onFocus }: FocusManagerOptions = {}) {
        this.scope = scope;
        this.isVirtual = isVirtual;
        this.keyProp = keyProp;
        this.onFocus = onFocus;
    }

    get elements() {
        return this.scope.elements;
    }

    private focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusOptions = {}) {
        if (!isNil(element)) {
            if (this.isVirtual) {
                const { elements } = this.scope;

                elements.forEach(x => {
                    if (x.classList.contains(VirtualFocusCssClass)) {
                        x.classList.remove(VirtualFocusCssClass);
                    }
                });

                element.classList.add(VirtualFocusCssClass);
            } else {
                if (isFunction(element.focus)) {
                    element.focus();

                    [onFocus, this.onFocus].forEach(handler => {
                        if (!isNil(handler)) {
                            handler(element, { isVirtual: this.isVirtual, keyProp: this.keyProp });
                        }
                    });
                }
            }
        } else {
            if (!isNil(onNotFound)) {
                onNotFound({ isVirtual: this.isVirtual, keyProp: this.keyProp });
            }
        }

        return element;
    }

    focusFirst({ canFocus, ...options }: FocusOptions = {}) {
        const { elements } = this.scope;

        let target;

        const walker = createFocusableTreeWalker(this.scope.getScopeRoot(), { tabbable: false });

        if (elements.length > 0) {
            if (isNil(canFocus)) {
                target = elements[0];
            }
            else {
                do { target = walker.nextNode(); } while (!isNil(target) && !canFocus(target));
            }
        }

        return this.focusElement(target, options);
    }

    focusLast({ canFocus, ...options }: FocusOptions = {}) {
        const { elements } = this.scope;

        let target;

        const walker = createFocusableTreeWalker(this.scope.getScopeRoot(), { tabbable: false });

        if (elements.length > 0) {
            if (isNil(canFocus)) {
                target = elements[elements.length - 1];
            }
            else {
                walker.currentNode = elements[elements.length - 1];

                do { target = walker.previousNode(); } while (!isNil(target) && !canFocus(target));
            }
        }

        return this.focusElement(target, options);
    }

    focusNext({ canFocus, ...options }: FocusOptions = {}) {
        const { elements } = this.scope;

        let target;

        const walker = createFocusableTreeWalker(this.scope.getScopeRoot(), { tabbable: false });

        if (elements.length > 0) {
            let hasLooped = false;

            canFocus = !isNil(canFocus) ? canFocus : () => true;

            const index = this.isVirtual
                ? elements.findIndex(x => x.classList.contains(VirtualFocusCssClass))
                : elements.indexOf(document.activeElement as HTMLElement);

            if (index !== -1) {
                walker.currentNode = elements[index];
            }

            do {
                target = (index === -1 && canFocus(elements[0])) ? elements[0] : walker.nextNode();

                if (isNil(target)) {
                    target = elements[0];
                }

                // If we do a full loop it means there are no focusable elements (probably because of canFocus)
                // therefore we should stop looping to prevent an infinite loop.
                if (target === elements[index]) {
                    hasLooped = true;
                }

                if (!isNil(target) && !canFocus(target)) {
                    target = null;
                }
            } while (isNil(target) && !hasLooped);
        }

        return this.focusElement(target, options);
    }

    focusPrevious({ canFocus, ...options }: FocusOptions = {}) {
        const { elements } = this.scope;

        let target;

        const walker = createFocusableTreeWalker(this.scope.getScopeRoot(), { tabbable: false });

        if (elements.length > 0) {
            let hasLooped = false;

            canFocus = !isNil(canFocus) ? canFocus : () => true;

            const index = this.isVirtual
                ? elements.findIndex(x => x.classList.contains(VirtualFocusCssClass))
                : elements.indexOf(document.activeElement as HTMLElement);

            if (index !== -1) {
                walker.currentNode = elements[index];
            }

            do {
                target = (index === -1 && canFocus(elements[elements.length - 1])) ? elements[elements.length - 1] : walker.previousNode();

                if (isNil(target)) {
                    target = elements[elements.length - 1];
                }

                // If we do a full loop it means there are no focusable elements (probably because of canFocus)
                // therefore we should stop looping to prevent an infinite loop.
                if (target === elements[index]) {
                    hasLooped = true;
                }

                if (!isNil(target) && !canFocus(target)) {
                    target = null;
                }
            } while (isNil(target) && !hasLooped);
        }

        return this.focusElement(target, options);
    }

    focusKey(key: string, options?: FocusOptions) {
        const { elements } = this.scope;

        if (isNil(this.keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        return this.focusElement(elements.find(x => x.getAttribute(this.keyProp) === key?.toString()), options);
    }

    focusTarget(target: string, options?: FocusOptions) {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                return this.focusLast(options);
            default:
                return this.focusKey(target, options);
        }
    }

    search(query: string, options?: FocusOptions) {
        const { elements } = this.scope;

        return this.focusElement(elements.find(x => x.textContent?.toLowerCase().startsWith(query)), options);
    }

    isInScope(element: HTMLElement) {
        return !isNil(element) && this.scope.isInScope(element as HTMLElement);
    }

    getActiveElement() {
        if (this.isVirtual) {
            const { elements } = this.scope;

            return elements.find(x => x.classList.contains(VirtualFocusCssClass));
        }

        return document.activeElement;
    }
}

export function useFocusManager(scope: DomScope, { isVirtual, keyProp, onFocus }: FocusManagerOptions = {}) {
    return useMemo(() => new FocusManager(scope, { isVirtual, keyProp, onFocus }), [scope, isVirtual, keyProp, onFocus]);
}
