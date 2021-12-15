import { FocusManager, Keys, isNil, useDisposables, useDocumentListener, useEventCallback, useRefState } from "../../shared";

import { useEffect } from "react";

export function useTrapFocus(focusManager: FocusManager) {
    const [focusedElementRef, setFocusedElement] = useRefState<HTMLElement>();

    const disposables = useDisposables();

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.tab) {
            const currentActiveElement = event.target;

            // When there are multiple overlay scopes (like a select in modal), we must ensure focus trap doesn't interfer with nested overlay components.
            // E.g. we don't want the modal focus trap to prevent any focus behavior of the select component.
            if (focusManager.isInScope(currentActiveElement as HTMLElement)) {
                event.preventDefault();
                event.stopPropagation();

                if (event.shiftKey) {
                    const element = focusManager.focusPrevious();
                    setFocusedElement(element);
                } else {
                    const element = focusManager.focusNext();
                    setFocusedElement(element);
                }
            }
        }
    });

    // If a focus event occurs outside the scope (e.g. user tabs from browser location bar),
    // restore focus to the previously focused node or the first tabbable element in the active scope.
    const handleFocus = useEventCallback((event: FocusEvent) => {
        const target = event.target as HTMLElement;

        if (!focusManager.isInScope(target, { includeChildScopes: true })) {
            if (!isNil(focusedElementRef.current)) {
                focusedElementRef.current.focus();
            } else {
                const element = focusManager.focusFirst();
                setFocusedElement(element);
            }
        } else {
            setFocusedElement(target);
        }
    });

    const handleBlur = useEventCallback((event: FocusEvent) => {
        // Firefox doesn't shift focus back properly without this.
        disposables.requestAnimationFrame(() => {
            if (!focusManager.isInScope(event.relatedTarget as HTMLElement)) {
                focusedElementRef.current.focus();
            }
        });
    });

    // Keydown event listener "useCapture" is set to true to ensure a tab key down is catched before the useRestoreFocus tab key down handler.
    useDocumentListener("keydown", handleKeyDown, true, true);
    useDocumentListener("focusin", handleFocus, true, false);

    useEffect(() => {
        focusManager.scopeElements.forEach(x => x.addEventListener("focusout", handleBlur, false));

        return () => {
            focusManager.scopeElements.forEach(x => x.removeEventListener("focusout", handleBlur, false));
        };
    }, [focusManager, handleBlur]);
}
