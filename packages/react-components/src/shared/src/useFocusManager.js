import { isFunction, isNil } from "lodash";
import { useMemo } from "react";

export const FocusTarget = {
    first: "first",
    last: "last"
};

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

    focusFirst(options) {
        const { elements } = this._scope;

        return this._focusElement(elements[0], options);
    }

    focusLast(options) {
        const { elements } = this._scope;

        return this._focusElement(elements[elements.length - 1], options);
    }

    focusNext(currentElement, options) {
        const { elements } = this._scope;

        const index = elements.indexOf(currentElement);

        if (index === -1 || index + 1 > (elements.length - 1)) {
            return this.focusFirst(options);
        }

        return this._focusElement(elements[index + 1], options);
    }

    focusPrevious(currentElement, options) {
        const { elements } = this._scope;

        const index = elements.indexOf(currentElement);

        if (index === -1 || index - 1 < 0) {
            return this.focusLast(options);
        }

        return this._focusElement(elements[index - 1], options);
    }

    focusKey(key, options) {
        const { elements } = this._scope;

        if (isNil(this._keyProp)) {
            throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManager.");
        }

        return this._focusElement(elements.find(x => x.getAttribute(this._keyProp) === key.toString()), options);
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
}

export function useFocusManager(scope, { keyProp } = {}) {
    return useMemo(() => new FocusManager(scope, { keyProp }), [scope, keyProp]);
}
