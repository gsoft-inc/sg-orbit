import { KeyboardEvent, KeyboardEventHandler } from "react";

import { FocusManager } from "./useFocusManager";
import { Keys } from "./keys";
import { isNil } from "./assertions";
import { useEventCallback } from "./useEventCallback";

export interface KeyboardNavigationOptions {
    onCanSelect?: (event: KeyboardEvent, element: Element, key: Keys) => boolean;
    onSelect?: (event: KeyboardEvent, element: Element, key: Keys) => void;
}

export interface KeyboardNavigationBindings {
    first?: Keys[];
    last?: Keys[];
    next?: Keys[];
    previous?: Keys[];
}

export function useKeyboardNavigation(focusManager: FocusManager, { first = [], last = [], next = [], previous = [] }: KeyboardNavigationBindings, { onCanSelect, onSelect }: KeyboardNavigationOptions = {}) {
    const handleKeyDown: KeyboardEventHandler = useEventCallback((event: KeyboardEvent) => {
        const key = event.key as Keys;

        const handleCanFocus = isNil(onCanSelect) ? undefined : (element: HTMLElement) => {
            return onCanSelect(event, element, key);
        };

        const handleFocus = isNil(onSelect) ? undefined : (element: HTMLElement) => {
            onSelect(event, element, key);
        };

        if (previous.includes(key)) {
            event.preventDefault();
            focusManager.focusPrevious({ canFocus: handleCanFocus, onFocus: handleFocus });
        } else if (next.includes(key)) {
            event.preventDefault();
            focusManager.focusNext({ canFocus: handleCanFocus, onFocus: handleFocus });
        } else if (first.includes(key)) {
            event.preventDefault();
            focusManager.focusFirst({ canFocus: handleCanFocus, onFocus: handleFocus });
        } else if (last.includes(key)) {
            event.preventDefault();
            focusManager.focusLast({ canFocus: handleCanFocus, onFocus: handleFocus });
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
