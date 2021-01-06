import { isNil } from "lodash";
import { useEventCallback } from "./useEventCallback";

export function useBasicKeyboardNavigation(focusManager, { previous = [], next = [], first = [], last = [] }, { onSelect } = {}) {
    const handleKeyDown = useEventCallback(event => {
        event.preventDefault();

        const handleFocus = element => {
            if (!isNil(onSelect)) {
                onSelect(event, element);
            }
        };

        const keyCode = event.keyCode;

        if (previous.includes(keyCode)) {
            focusManager.focusPrevious(event.target, { onFocus: handleFocus });
        } else if (next.includes(keyCode)) {
            focusManager.focusNext(event.target, { onFocus: handleFocus });
        } else if (first.includes(keyCode)) {
            focusManager.focusFirst({ onFocus: handleFocus });
        } else if (last.includes(keyCode)) {
            focusManager.focusLast({ onFocus: handleFocus });
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
