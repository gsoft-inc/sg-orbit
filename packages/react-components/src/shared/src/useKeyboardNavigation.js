import { createNavigableTreeWalker } from "./focusableTreeWalker";
import { isFunction, isNil } from "lodash";
import { useEventCallback } from "./useEventCallback";

export function useKeyboardNavigation({ previous = [], next = [], first = [], last = [] }, onSelect) {
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
        const navigableTreeWalker = createNavigableTreeWalker(event.currentTarget, event.target);
        const keyCode = event.keyCode;

        if (previous.includes(keyCode)) {
            selectElement(event, navigableTreeWalker.previous());
        } else if (next.includes(keyCode)) {
            selectElement(event, navigableTreeWalker.next());
        } else if (first.includes(keyCode)) {
            selectElement(event, navigableTreeWalker.first());
        } else if (last.includes(keyCode)) {
            selectElement(event, navigableTreeWalker.last());
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
