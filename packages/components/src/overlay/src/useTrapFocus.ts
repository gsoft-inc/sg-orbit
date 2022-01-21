import { FocusManager, Keys, isNil, useDocumentListener, useEventCallback, useRefState } from "../../shared";

export interface UseTrapFocusOptions {
    isDisabled?: boolean;
}

export function useTrapFocus(focusManager: FocusManager, { isDisabled }: UseTrapFocusOptions = {}) {
    const [focusedElementRef, setFocusedElement] = useRefState<HTMLElement>();

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (focusManager.trapFocusList.length > 0) { return; }
        if (event.key === Keys.tab) {
            const currentActiveElement = event.target;

            // When there are multiple overlay scopes (like a select in a modal), we must ensure focus trap doesn't interfer with nested overlay components.
            // E.g. we don't want the modal focus trap to prevent any focus behavior of the select component.
            if (focusManager.isInScope(currentActiveElement as HTMLElement)) {
                event.preventDefault();
                event.stopPropagation();

                if (event.shiftKey) {
                    const element = focusManager.focusPrevious({ tabbableOnly: true });
                    setFocusedElement(element);
                    focusManager.addTrapFocusToList(element);
                } else {
                    const element = focusManager.focusNext({ tabbableOnly: true });
                    setFocusedElement(element);
                    focusManager.addTrapFocusToList(element);
                }
            }
        }
    });

    // If a focus event occurs outside the scope (e.g. user tabs from browser location bar),
    // restore focus to the previously focused node or the first tabbable element in the active scope.
    const handleFocus = useEventCallback((event: FocusEvent) => {
        if (focusManager.trapFocusList.length > 0) { return; }
        const target = event.target as HTMLElement;

        if (!focusManager.isInScope(target, { includeChildScopes: true })) {
            if (!isNil(focusedElementRef.current)) {
                focusedElementRef.current.focus();
            } else {
                const element = focusManager.focusFirst({ tabbableOnly: true });
                setFocusedElement(element);
                focusManager.addTrapFocusToList(element);
            }
        } else {
            setFocusedElement(target);
            focusManager.addTrapFocusToList(target);
        }
    });


    // Using the capture phrase for the keydown event listener to ensure this hook catch a tab keydown event before the useRestoreFocus hook keydown handler.
    useDocumentListener("keydown", handleKeyDown, !isDisabled, { capture: true });
    useDocumentListener("focusin", handleFocus, !isDisabled);
}
