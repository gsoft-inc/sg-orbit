// The focus restore logic has been greatly inspired from: https://github.com/adobe/react-spectrum/blob/c2c187606d447a6daa185e0b0507c22883ab3147/packages/%40react-aria/focus/src/FocusScope.tsx#L324

// This restore focus hook only works because we use an animation to fade away the overlay. Without an animation, the active element will always be the body which
// will be out of scope. To fix this, it would probably requires this code to become a React element instead of a React hook.

import { DomScope, Keys, createFocusableTreeWalker, isNil, useEventCallback, useRefState } from "../../shared";
import { KeyboardEvent, useLayoutEffect } from "react";

export interface UseRestoreFocusOptions {
    isDisabled?: boolean;
}

// Restore focus feature doesn't work when clicking outside, this is by design.
export function useRestoreFocus(scope: DomScope, { isDisabled }: UseRestoreFocusOptions = {}) {
    const [elementToRestoreRef, setElementToRestore] = useRefState<HTMLElement>();

    useLayoutEffect(() => {
        setElementToRestore(document.activeElement as HTMLElement);
    }, [isDisabled, setElementToRestore]);

    // Handle the tab key so that tabbing out of the scope goes to the next element after the node that had focus when the scope mounted.
    // This is important when using portals for overlays, so that focus goes to the expected element when tabbing out of the overlay.
    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.tab) {
            // Since stopImmediatePropagation doesn't work in React, it's a small hack to ensure this hook works well with useTrapFocus.
            if (!event.isPropagationStopped()) {
                const focusedElement = event.target;

                // Create a DOM tree walker that matches all tabbable elements.
                const walker = createFocusableTreeWalker(document.body, { tabbable: true });
                walker.currentNode = focusedElement as Node;

                const next = () => {
                    return event.shiftKey ? walker.previousNode() : walker.nextNode() as HTMLElement;
                };

                // Find the next tabbable element after the currently focused element.
                let nextElement = next() as HTMLElement;

                // If there is no next element, or it is outside the current scope, move focus to the
                // next element after the node to restore to instead.
                if (isNil(nextElement) || !scope.isInScope(nextElement)) {
                    const elementToRestore = elementToRestoreRef.current;

                    if (document.body.contains(elementToRestore)) {
                        walker.currentNode = elementToRestore;

                        // Skip over elements within the scope, in case the scope immediately follows the node to restore.
                        do {
                            nextElement = next() as HTMLElement;
                        } while (nextElement === event.currentTarget || scope.isInScope(nextElement));

                        event.preventDefault();

                        if (!isNil(nextElement)) {
                            nextElement.focus();
                        } else {
                            elementToRestore.focus();
                        }
                    }
                }
            }
        }
    });

    useLayoutEffect(() => {
        if (!isDisabled) {
            return () => {
                if (scope.isInScope(document.activeElement as HTMLElement)) {
                    // Don't move this line inside the frame.
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const elementToRestore = elementToRestoreRef.current;

                    requestAnimationFrame(() => {
                        if (document.body.contains(elementToRestore)) {
                            elementToRestore.focus();
                        }
                    });
                }
            };
        }
    }, [scope, isDisabled, elementToRestoreRef]);

    return isDisabled ? {} : {
        onKeyDown: handleKeyDown
    };
}
