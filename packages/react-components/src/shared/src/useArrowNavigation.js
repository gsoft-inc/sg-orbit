import { getFirstNavigableElement, getLastNavigableElement, getNextNavigableElement, getPreviousNavigableElement } from "./createFocusableTreeWalker";
import { isFunction, isNil } from "lodash";
import { useEventCallback } from "./useEventCallback";

export function useArrowNavigation({ previous = [], next = [], first = [], last = [] }, onSelect) {
    const selectElement = (event, element) => {
        event.preventDefault();

        if (isFunction(element.focus)) {
            element.focus();
        }

        if (!isNil(onSelect)) {
            onSelect(event, element);
        }
    };

    const handleKeyDown = useEventCallback(event => {
        const keyCode = event.keyCode;

        if (previous.includes(keyCode)) {
            selectElement(event, getPreviousNavigableElement(event.currentTarget, event.target));
        } else if (next.includes(keyCode)) {
            selectElement(event, getNextNavigableElement(event.currentTarget, event.target));
        } else if (first.includes(keyCode)) {
            selectElement(event, getFirstNavigableElement(event.currentTarget));
        } else if (last.includes(keyCode)) {
            selectElement(event, getLastNavigableElement(event.currentTarget));
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
