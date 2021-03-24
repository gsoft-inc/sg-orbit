import { KeyboardEvent, KeyboardEventHandler } from "react";
import { Keys } from "./keys";
import { isNil } from "lodash";
import { useEventCallback } from "./useEventCallback";
import type { FocusManager } from "./useFocusManager";

interface KeyboardNavigationOptions {
    onSelect?(event: KeyboardEvent, element: Element): void;
}

interface KeyboardNavigationBindings {
    previous?: Keys[];
    next?: Keys[];
    first?: Keys[];
    last?: Keys[];
}

export function useKeyboardNavigation(focusManager: FocusManager, { previous = [], next = [], first = [], last = [] }: KeyboardNavigationBindings, { onSelect }: KeyboardNavigationOptions = {}) {
    const handleKeyDown: KeyboardEventHandler = useEventCallback((event: KeyboardEvent) => {
        const key = event.key as any;

        const handleFocus = (element: HTMLElement) => {
            if (!isNil(onSelect)) {
                onSelect(event, element);
            }
        };

        if (previous.includes(key)) {
            event.preventDefault();
            focusManager.focusPrevious({ onFocus: handleFocus });
        } else if (next.includes(key)) {
            event.preventDefault();
            focusManager.focusNext({ onFocus: handleFocus });
        } else if (first.includes(key)) {
            event.preventDefault();
            focusManager.focusFirst({ onFocus: handleFocus });
        } else if (last.includes(key)) {
            event.preventDefault();
            focusManager.focusLast({ onFocus: handleFocus });
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
