import { FocusTarget } from "./focusTarget";
import { isFunction, isNil } from "lodash";
import { useMemo } from "react";

// In special circumstances that should not happen for our use cases this interator might cause an infinite
// loop when it's used with "canFocus" and a condition which result in discarding all the elements.
class InfiniteIterator {
    _elements;
    _index;

    constructor(elements, { from = -1 } = {}) {
        this._elements = elements;
        this._index = from;
    }

    next() {
        if (this._index < this._elements.length - 1) {
            this._index++;
        } else {
            this._index = 0;
        }

        return this._elements[this._index];
    }

    previous() {
        if (this._index > 0) {
            this._index--;
        } else {
            this._index = this._elements.length - 1;
        }

        return this._elements[this._index];
    }
}

export class FocusManager {
    _scope;
    _keyProp;

    constructor(scope, { keyProp } = {}) {
        this._scope = scope;
        this._keyProp = keyProp;
    }

    _focusElement(element, { onFocus, onNotFound } = {}) {
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

    focusFirst({ canFocus, ...options } = {}) {
        const { elements } = this._scope;

        let target;

        if (isNil(canFocus)) {
            target = elements[0];
        } else {
            const iterator = new InfiniteIterator(elements);

            do { target = iterator.next(); } while(!canFocus(target));
        }

        return this._focusElement(target, options);
    }

    focusLast({ canFocus, ...options } = {}) {
        const { elements } = this._scope;

        let target;

        if (isNil(canFocus)) {
            target = elements[elements.length - 1];
        }
        else {
            const iterator = new InfiniteIterator(elements);

            do { target = iterator.previous(); } while(!canFocus(target));
        }

        return this._focusElement(target, options);
    }

    focusNext(currentElement, { canFocus, ...options } = {}) {
        const { elements } = this._scope;

        let target;

        const index = elements.indexOf(currentElement);
        const iterator = new InfiniteIterator(elements, { from: index !== -1 ? index : undefined });

        if (isNil(canFocus)) {
            target = iterator.next();
        } else {
            do { target = iterator.next(); } while(!canFocus(target));
        }

        return this._focusElement(target, options);
    }

    focusPrevious(currentElement, { canFocus, ...options } = {}) {
        const { elements } = this._scope;

        let target;

        const index = elements.indexOf(currentElement);
        const iterator = new InfiniteIterator(elements, { from: index !== -1 ? index : undefined });

        if (isNil(canFocus)) {
            target = iterator.previous();
        } else {
            do { target = iterator.previous(); } while(!canFocus(target));
        }

        return this._focusElement(target, options);
    }

    focusKey(key, options) {
        const { elements } = this._scope;

        if (isNil(this._keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        return this._focusElement(elements.find(x => x.getAttribute(this._keyProp) === key?.toString()), options);
    }

    focusTarget(target, options) {
        switch (target) {
            case FocusTarget.first:
                return this.focusFirst(options);
            case FocusTarget.last:
                return this.focusLast(options);
            default:
                return this.focusKey(target, options);
        }
    }

    search(query, options) {
        const { elements } = this._scope;

        return this._focusElement(elements.find(x => x.textContent?.toLowerCase().startsWith(query)), options);
    }

    hasFocus() {
        const { elements } = this._scope;

        return elements.some(x => x === document.activeElement);
    }
}

export function useFocusManager(scope, { keyProp } = {}) {
    return useMemo(() => new FocusManager(scope, { keyProp }), [scope, keyProp]);
}
