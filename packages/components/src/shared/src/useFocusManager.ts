import { FocusScope, FocusScopeIterator } from "./useFocusScope";
import { isFunction, isNil } from "./assertions";

import { FocusTarget } from "./focusTarget";
import { useMemo } from "react";

export interface FocusManagerOptions {
    keyProp?: string;
    onFocus?: (targetElement: HTMLElement) => void;
}

export interface FocusHandlers {
    onFocus?: (targetElement: HTMLElement) => void;
    onNotFound?: () => void;
}

export interface FocusIterationOptions extends FocusHandlers {
    canFocus?: (element: HTMLElement) => boolean;
    tabbableOnly?: boolean;
}

export interface FocusManager {
    focusFirst: (options: FocusIterationOptions) => HTMLElement;
    focusFirstQueryMatch: (query: string, handlers?: FocusHandlers) => HTMLElement;
    focusKey: (key: string, handlers?: FocusHandlers) => HTMLElement;
    focusLast: (options: FocusIterationOptions) => HTMLElement;
    focusNext: (options: FocusIterationOptions) => HTMLElement;
    focusPrevious: (options: FocusIterationOptions) => HTMLElement;
    focusTarget: (key: string, handlers?: FocusHandlers) => HTMLElement;
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

    protected abstract focusElement(element: HTMLElement, handlers: FocusHandlers);

    focusFirst({ canFocus, tabbableOnly, ...options }: FocusIterationOptions = {}) {
        const iterator = new FocusScopeIterator(this.scope, { tabbableOnly });

        const element = iterator.firstElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusLast({ canFocus, tabbableOnly, ...options }: FocusIterationOptions = {}) {
        const iterator = new FocusScopeIterator(this.scope, { tabbableOnly });

        const element = iterator.lastElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusNext({ canFocus, tabbableOnly, ...options }: FocusIterationOptions = {}) {
        const from = this.getActiveElementIndex();

        const iterator = new FocusScopeIterator(this.scope, { from: from !== -1 ? from : undefined, tabbableOnly });

        const element = iterator.nextElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusPrevious({ canFocus, tabbableOnly, ...options }: FocusIterationOptions = {}) {
        const from = this.getActiveElementIndex();

        const iterator = new FocusScopeIterator(this.scope, { from: from !== -1 ? from : undefined, tabbableOnly });

        const element = iterator.previousElement({ accept: canFocus });

        this.focusElement(element, options);

        return element;
    }

    focusKey(key: string, handlers?: FocusHandlers) {
        const { elements } = this.scope;

        if (isNil(this.keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        const element = elements.find((x: HTMLElement) => x.getAttribute(this.keyProp) === key?.toString());

        this.focusElement(element, handlers);

        return element;
    }

    focusTarget(target: string, options?: FocusHandlers) {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                return this.focusLast(options);
        }

        return this.focusKey(target, options);
    }

    focusFirstQueryMatch(query: string, options?: FocusHandlers) {
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

    protected focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusHandlers = {}) {
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

    protected focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusHandlers = {}) {
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

// export class ElementIterator<T> {
//     private elements;
//     private index;

//     constructor(elements: T[], { from = -1 } = {}) {
//         this.elements = elements;
//         this.index = from;
//     }

//     next() {
//         if (this.index < this.elements.length - 1) {
//             return this.elements[++this.index];
//         }

//         return null;
//     }

//     previous() {
//         if (this.index > 0) {
//             return this.elements[--this.index];
//         }

//         return null;
//     }

//     reset({ from = -1 } = {}) {
//         this.index = from;
//     }

//     get currentIndex() {
//         return this.index;
//     }
// }

// export interface FocusManagerOptions {
//     isVirtual?: boolean;
//     keyProp?: string;
//     onFocus?: (activeElement: HTMLElement, options: Omit<FocusManagerOptions, "onFocus">) => void;
// }

// export interface FocusOptions {
//     canFocus?: (element: HTMLElement) => boolean;
//     onFocus?: (activeElement: HTMLElement, options: Omit<FocusManagerOptions, "onFocus">) => void;
//     onNotFound?: (options: Omit<FocusManagerOptions, "onFocus">) => void;
// }

// export class FocusManager {
//     private scope;
//     private isVirtual;
//     private keyProp;
//     private onFocus;

//     constructor(scope: FocusScope, { isVirtual = false, keyProp, onFocus }: FocusManagerOptions = {}) {
//         this.scope = scope;
//         this.isVirtual = isVirtual;
//         this.keyProp = keyProp;
//         this.onFocus = onFocus;
//     }

//     get elements() {
//         return this.scope.elements;
//     }

//     private focusElement(element: HTMLElement, { onFocus, onNotFound }: FocusOptions = {}) {
//         if (!isNil(element)) {
//             if (this.isVirtual) {
//                 const { elements } = this.scope;

//                 elements.forEach(x => {
//                     if (x.classList.contains(VirtualFocusCssClass)) {
//                         x.classList.remove(VirtualFocusCssClass);
//                     }
//                 });

//                 element.classList.add(VirtualFocusCssClass);
//             } else {
//                 if (isFunction(element.focus)) {
//                     element.focus();

//                     [onFocus, this.onFocus].forEach(handler => {
//                         if (!isNil(handler)) {
//                             handler(element, { isVirtual: this.isVirtual, keyProp: this.keyProp });
//                         }
//                     });
//                 }
//             }
//         } else {
//             if (!isNil(onNotFound)) {
//                 onNotFound({ isVirtual: this.isVirtual, keyProp: this.keyProp });
//             }
//         }

//         return element;
//     }

//     focusFirst({ canFocus, ...options }: FocusOptions = {}) {
//         const { elements } = this.scope;

//         let target;

//         if (elements.length > 0) {
//             if (isNil(canFocus)) {
//                 target = elements[0];
//             }
//             else {
//                 const iterator = new ElementIterator(elements);

//                 do { target = iterator.next(); } while (!isNil(target) && !canFocus(target));
//             }
//         }

//         return this.focusElement(target, options);
//     }

//     focusLast({ canFocus, ...options }: FocusOptions = {}) {
//         const { elements } = this.scope;

//         let target: HTMLElement;

//         if (elements.length > 0) {
//             if (isNil(canFocus)) {
//                 target = elements[elements.length - 1];
//             }
//             else {
//                 const iterator = new ElementIterator(elements, { from: elements.length });

//                 do { target = iterator.previous(); } while (!isNil(target) && !canFocus(target));
//             }
//         }

//         return this.focusElement(target, options);
//     }

//     focusNext({ canFocus, ...options }: FocusOptions = {}) {
//         const { elements } = this.scope;

//         let target;

//         if (elements.length > 0) {
//             let hasLooped = false;

//             canFocus = !isNil(canFocus) ? canFocus : () => true;

//             const index = this.isVirtual
//                 ? elements.findIndex(x => x.classList.contains(VirtualFocusCssClass))
//                 : elements.indexOf(document.activeElement as HTMLElement);

//             const iterator = new ElementIterator(elements, { from: index !== -1 ? index : undefined });

//             do {
//                 target = iterator.next();

//                 if (isNil(target)) {
//                     iterator.reset();
//                 }

//                 // If we do a full loop it means there are no focusable elements (probably because of canFocus)
//                 // therefore we should stop looping to prevent an infinite loop.
//                 if (iterator.currentIndex === index) {
//                     hasLooped = true;
//                 }

//                 if (!isNil(target) && !canFocus(target)) {
//                     target = null;
//                 }
//             } while (isNil(target) && !hasLooped);
//         }

//         return this.focusElement(target, options);
//     }

//     focusPrevious({ canFocus, ...options }: FocusOptions = {}) {
//         const { elements } = this.scope;

//         let target;

//         if (elements.length > 0) {
//             let hasLooped = false;

//             canFocus = !isNil(canFocus) ? canFocus : () => true;

//             const index = this.isVirtual
//                 ? elements.findIndex(x => x.classList.contains(VirtualFocusCssClass))
//                 : elements.indexOf(document.activeElement as HTMLElement);

//             const iterator = new ElementIterator(elements, { from: index !== -1 ? index : undefined });

//             do {
//                 target = iterator.previous();

//                 if (isNil(target)) {
//                     iterator.reset({ from: elements.length });
//                 }

//                 // If we do a full loop it means there are no focusable elements (probably because of canFocus)
//                 // therefore we should stop looping to prevent an infinite loop.
//                 if (iterator.currentIndex === index) {
//                     hasLooped = true;
//                 }

//                 if (!isNil(target) && !canFocus(target)) {
//                     target = null;
//                 }
//             } while (isNil(target) && !hasLooped);
//         }

//         return this.focusElement(target, options);
//     }

//     focusKey(key: string, options?: FocusOptions) {
//         const { elements } = this.scope;

//         if (isNil(this.keyProp)) {
//             throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
//         }

//         return this.focusElement(elements.find(x => x.getAttribute(this.keyProp) === key?.toString()), options);
//     }

//     focusTarget(target: string, options?: FocusOptions) {
//         switch (target) {
//             case FocusTarget.first:
//                 return this.focusFirst(options);
//             case FocusTarget.last:
//                 return this.focusLast(options);
//             default:
//                 return this.focusKey(target, options);
//         }
//     }

//     search(query: string, options?: FocusOptions) {
//         const { elements } = this.scope;

//         return this.focusElement(elements.find(x => x.textContent?.toLowerCase().startsWith(query)), options);
//     }

//     // TODO: should use scope directly?!?!
//     isInScope(element: HTMLElement) {
//         return !isNil(element) && this.scope.isInScope(element as HTMLElement);
//     }

//     // TODO: mehhhh -> move to VirtualFocusManager
//     getActiveElement() {
//         if (this.isVirtual) {
//             const { elements } = this.scope;

//             return elements.find(x => x.classList.contains(VirtualFocusCssClass));
//         }

//         return document.activeElement;
//     }
// }

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
