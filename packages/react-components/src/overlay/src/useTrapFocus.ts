import { FocusManager, Keys, useEventCallback } from "../../shared";

// NOTE: This hook handler must be called before useRestoreFocus handler in order to stop the propagation of the tab event.

export function useTrapFocus(focusManager: FocusManager) {
    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.tab) {
            event.preventDefault();
            event.stopPropagation();

            if (event.shiftKey) {
                focusManager.focusPrevious();
            } else {
                focusManager.focusNext();
            }
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}
