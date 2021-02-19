import { DomScope } from "./useFocusScope";
import { FocusTarget } from "./focusTarget";
import { isFunction, isNil } from "lodash";
import { useMemo } from "react";

export class ElementIterator<T> {
    private elements;
    private index;

    constructor(elements: T[], { from = -1 } = {}) {
        this.elements = elements;
        this.index = from;
    }

    next(): T {
        if (this.index < this.elements.length - 1) {
            return this.elements[++this.index];
        }

        return null;
    }

    previous(): T {
        if (this.index > 0) {
            return this.elements[--this.index];
        }

        return null;
    }

    reset({ from = -1 } = {}): void {
        this.index = from;
    }

    get currentIndex(): number {
        return this.index;
    }
}

interface FocusManagerOptions {
    isVirtual?: boolean,
    keyProp?: string;
}

export interface FocusOptions {
    onFocus?(element?: HTMLElement): void
    onNotFound?(): void
    canFocus?(element: HTMLElement): boolean;
}

export class FocusManager {
    private scope;
    private isVirtual;
    private keyProp;

    constructor(scope: DomScope, { isVirtual = false, keyProp }: FocusManagerOptions = {}) {
        this.scope = scope;
        this.isVirtual = isVirtual;
        this.keyProp = keyProp;
    }

    private focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusOptions = {}): HTMLElement {
        if (!isNil(element)) {
            if (this.isVirtual) {
                const { elements } = this.scope;

                elements.forEach(x => {
                    if (x.classList.contains("o-ui-focus")) {
                        x.classList.remove("o-ui-focus");
                    }
                });

                element.classList.add("o-ui-focus");
            } else {
                if (isFunction(element.focus)) {
                    element.focus();

                    if (!isNil(onFocus)) {
                        onFocus(element);
                    }
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
        const { elements } = this.scope;

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

        return this.focusElement(target, options);
    }

    focusLast({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this.scope;

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

        return this.focusElement(target, options);
    }

    focusNext({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this.scope;

        let target;

        if (elements.length > 0) {
            let hasLooped = false;

            canFocus = !isNil(canFocus) ? canFocus : () => true;

            const index = this.isVirtual
                ? elements.findIndex(x => x.classList.contains("o-ui-focus"))
                : elements.indexOf(document.activeElement as HTMLElement);

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

        return this.focusElement(target, options);
    }

    focusPrevious({ canFocus, ...options }: FocusOptions = {}): HTMLElement {
        const { elements } = this.scope;

        let target;

        if (elements.length > 0) {
            let hasLooped = false;

            canFocus = !isNil(canFocus) ? canFocus : () => true;

            const index = this.isVirtual
                ? elements.findIndex(x => x.classList.contains("o-ui-focus"))
                : elements.indexOf(document.activeElement as HTMLElement);

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

        return this.focusElement(target, options);
    }

    focusKey(key: string, options: FocusOptions): HTMLElement {
        const { elements } = this.scope;

        if (isNil(this.keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        return this.focusElement(elements.find(x => x.getAttribute(this.keyProp) === key?.toString()), options);
    }

    focusTarget(target: FocusTarget, options: FocusOptions): HTMLElement {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                return this.focusLast(options);
            default:
                return this.focusKey(target, options);
        }
    }

    search(query: string, options: FocusOptions): HTMLElement {
        const { elements } = this.scope;

        return this.focusElement(elements.find(x => x.textContent?.toLowerCase().startsWith(query)), options);
    }

    hasFocus(): boolean {
        return this.scope.isInScope(document.activeElement as HTMLElement);
    }
}

export function useFocusManager(scope: DomScope, { isVirtual, keyProp }: FocusManagerOptions = {}): FocusManager {
    return useMemo(() => new FocusManager(scope, { isVirtual, keyProp }), [scope, isVirtual, keyProp]);
}
