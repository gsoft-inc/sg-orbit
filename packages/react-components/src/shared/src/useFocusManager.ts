import { FocusScope } from "./useFocusScope";
import { FocusTarget } from "./focusTarget";
import { isFunction, isNil } from "lodash";
import { useMemo } from "react";

class ElementIterator<T> {
    _elements;
    _index;

    constructor(elements: T[], { from = -1 } = {}) {
        this._elements = elements;
        this._index = from;
    }

    next(): T {
        if (this._index < this._elements.length - 1) {
            return this._elements[++this._index];
        }

        return null;
    }

    previous(): T {
        if (this._index > 0) {
            return this._elements[--this._index];
        }

        return null;
    }

    reset({ from = -1 } = {}): void {
        this._index = from;
    }

    get currentIndex(): number {
        return this._index;
    }
}

export interface FocusManagerOptions {
    keyProp?: string;
}

export interface FocusOptions {
    onFocus?(element?: HTMLElement): void
    onNotFound?(): void
    canFocus?(element: HTMLElement): boolean;
}

export class FocusManager {
    _scope;
    _keyProp;

    constructor(scope: FocusScope, { keyProp }: FocusManagerOptions = {}) {
        this._scope = scope;
        this._keyProp = keyProp;
    }

    _focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusOptions = {}): HTMLElement {
        if (!isNil(element)) {
            if (isFunction(element.focus)) {
                element.focus();

                if (!isNil(onFocus)) {
                    onFocus(element);
                }
            }
        } else {
            if (!isNil(onNotFound)) {
                onNotFound();
            }
        }

        return element;
    }

    focusFirst({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this._scope;

        let target;

        if (elements.length > 0) {
            if (isNil(canFocus)) {
                target = elements[0];
            }
            else {
                const iterator = new ElementIterator(elements);

                do { target = iterator.next(); } while (!isNil(target) && !canFocus(target));
            }
        }

        return this._focusElement(target, options);
    }

    focusLast({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this._scope;

        let target: HTMLElement;

        if (elements.length > 0) {
            if (isNil(canFocus)) {
                target = elements[elements.length - 1];
            }
            else {
                const iterator = new ElementIterator(elements, { from: elements.length });

                do { target = iterator.previous(); } while (!isNil(target) && !canFocus(target));
            }
        }

        return this._focusElement(target, options);
    }

    focusNext({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this._scope;

        let target;

        if (elements.length > 0) {
            let hasLooped = false;

            canFocus = !isNil(canFocus) ? canFocus : () => true;

            const index = elements.indexOf(document.activeElement as HTMLElement);
            const iterator = new ElementIterator(elements, { from: index !== -1 ? index : undefined });

            do {
                target = iterator.next();

                if (isNil(target)) {
                    iterator.reset();
                }

                // If we do a full loop it means there are no focusable elements (probably because of canFocus)
                // therefore we should stop looping to prevent an infinite loop.
                if (iterator.currentIndex === index) {
                    hasLooped = true;
                }

                if (!isNil(target) && !canFocus(target)) {
                    target = null;
                }
            } while (isNil(target) && !hasLooped);
        }

        return this._focusElement(target, options);
    }

    focusPrevious({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this._scope;

        let target;

        if (elements.length > 0) {
            let hasLooped = false;

            canFocus = !isNil(canFocus) ? canFocus : () => true;

            const index = elements.indexOf(document.activeElement as HTMLElement);
            const iterator = new ElementIterator(elements, { from: index !== -1 ? index : undefined });

            do {
                target = iterator.previous();

                if (isNil(target)) {
                    iterator.reset({ from: elements.length });
                }

                // If we do a full loop it means there are no focusable elements (probably because of canFocus)
                // therefore we should stop looping to prevent an infinite loop.
                if (iterator.currentIndex === index) {
                    hasLooped = true;
                }

                if (!isNil(target) && !canFocus(target)) {
                    target = null;
                }
            } while (isNil(target) && !hasLooped);
        }

        return this._focusElement(target, options);
    }

    focusKey(key: FocusTarget, options: FocusOptions): HTMLElement {
        const { elements } = this._scope;

        if (isNil(this._keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        return this._focusElement(elements.find(x => x.getAttribute(this._keyProp) === key?.toString()), options);
    }

    focusTarget(target: FocusTarget, options: FocusOptions): HTMLElement {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                console.log("will focus last");

                return this.focusLast(options);
            default:
                return this.focusKey(target, options);
        }
    }

    search(query: string, options: FocusOptions): HTMLElement {
        const { elements } = this._scope;

        return this._focusElement(elements.find(x => x.textContent?.toLowerCase().startsWith(query)), options);
    }

    hasFocus(): boolean {
        return this._scope.isInScope(document.activeElement as HTMLElement);
    }
}

export function useFocusManager(scope: FocusScope, { keyProp }: FocusManagerOptions = {}): FocusManager {
    return useMemo(() => new FocusManager(scope, { keyProp }), [scope, keyProp]);
}
