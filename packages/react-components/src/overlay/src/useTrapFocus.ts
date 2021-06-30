import { FocusManager, Keys, useDocumentListener, useEventCallback } from "../../shared";

export function useTrapFocus(focusManager: FocusManager) {
    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.tab) {
            event.preventDefault();

            if (event.shiftKey) {
                focusManager.focusPrevious();
            } else {
                focusManager.focusNext();
            }
        }
    });

    useDocumentListener("keydown", handleKeyDown);
}
