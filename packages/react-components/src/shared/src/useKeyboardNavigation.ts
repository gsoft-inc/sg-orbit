import { KeyboardEvent, KeyboardEventHandler } from "react";
import { Keys } from "./keys";
import { isNil } from "lodash";
import { useEventCallback } from "./useEventCallback";
import type { FocusManager, FocusOptions } from "./useFocusManager";

interface KeyboardNavigationOptions {
    onSelect?(event: KeyboardEvent, element: Element): void;
}

interface KeyboardNavigationBindings {
    previous: Keys[];
    next: Keys[];
    first: Keys[];
    last: Keys[];
}

interface KeyboardNavigationAPI {
    onKeyDown: (event: KeyboardEvent) => void;
}

export function useKeyboardNavigation(focusManager: FocusManager, { previous = [], next = [], first = [], last = [] }: KeyboardNavigationBindings, { onSelect }: KeyboardNavigationOptions = {}): KeyboardNavigationAPI {
    const handleKeyDown: KeyboardEventHandler = useEventCallback((event: KeyboardEvent) => {
        const keyCode = event.keyCode;

        const handleFocus: FocusOptions["onFocus"] = element => {
            if (!isNil(onSelect)) {
                onSelect(event, element);
            }
        };

        if (previous.includes(keyCode)) {
            event.preventDefault();
            focusManager.focusPrevious({ onFocus: handleFocus });
        } else if (next.includes(keyCode)) {
            event.preventDefault();
            focusManager.focusNext({ onFocus: handleFocus });
        } else if (first.includes(keyCode)) {
            event.preventDefault();
            focusManager.focusFirst({ onFocus: handleFocus });
        } else if (last.includes(keyCode)) {
            event.preventDefault();
            focusManager.focusLast({ onFocus: handleFocus });
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
