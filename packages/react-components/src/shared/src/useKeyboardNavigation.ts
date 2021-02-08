import { isNil } from "lodash";
import { KeyboardEventHandler } from "react";
import { useEventCallback } from "./useEventCallback";
import type { FocusOptions, FocusManager } from "./useFocusManager"

interface KeyboardNavigationOptions {
    onSelect?(event: KeyboardEvent, element: Element): void;
}

interface KeyboardNavigationBindings {
    previous: string[];
    next: string[];
    first: string[];
    last: string[];
}

export function useKeyboardNavigation(focusManager: FocusManager, { previous = [], next = [], first = [], last = [] }: KeyboardNavigationBindings, { onSelect }: KeyboardNavigationOptions = {}) {
    const handleKeyDown: KeyboardEventHandler = useEventCallback((event: KeyboardEvent) => {
        const keyCode = event.keyCode;

        const handleFocus: FocusOptions["onFocus"] = element => {
            if (!isNil(onSelect)) {
                onSelect(event, element);
            }
        };

        if (previous.includes(keyCode.toString())) {
            event.preventDefault();
            focusManager.focusPrevious({ onFocus: handleFocus });
        } else if (next.includes(keyCode.toString())) {
            event.preventDefault();
            focusManager.focusNext({ onFocus: handleFocus });
        } else if (first.includes(keyCode.toString())) {
            event.preventDefault();
            focusManager.focusFirst({ onFocus: handleFocus });
        } else if (last.includes(keyCode.toString())) {
            event.preventDefault();
            focusManager.focusLast({ onFocus: handleFocus });
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
