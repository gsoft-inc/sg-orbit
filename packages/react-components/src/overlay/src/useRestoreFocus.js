// The focus restore logic has been greatly inspired from: https://github.com/adobe/react-spectrum/blob/c2c187606d447a6daa185e0b0507c22883ab3147/packages/%40react-aria/focus/src/FocusScope.tsx#L324

import { Keys, createFocusableTreeWalker, useEventCallback, useRefState } from "../../shared";
import { isNil } from "lodash";
import { useLayoutEffect } from "react";

// Restore focus feature doesn't work when clicking outside, this is by design.
export function useRestoreFocus(scope, { isDisabled } = {}) {
    const [elementToRestoreRef, setElementToRestore] = useRefState();

    useLayoutEffect(() => {
        setElementToRestore(document.activeElement);
    }, [isDisabled, setElementToRestore]);

    // Handle the tab key so that tabbing out of the scope goes to the next element after the node that had focus when the scope mounted.
    // This is important when using portals for overlays, so that focus goes to the expected element when tabbing out of the overlay.
    const handleKeyDown = useEventCallback(event => {
        if (event.keyCode === Keys.tab) {
            const focusedElement = event.target;

            // Create a DOM tree walker that matches all tabbable elements.
            const walker = createFocusableTreeWalker(document.body, { tabbable: true });
            walker.currentNode = focusedElement;

            const next = () => {
                return event.shiftKey ? walker.previousNode() : walker.nextNode();
            };

            // Find the next tabbable element after the currently focused element.
            let nextElement = next();

            // If there is no next element, or it is outside the current scope, move focus to the
            // next element after the node to restore to instead.
            if (isNil(nextElement) || !scope.isInScope(nextElement)) {
                const elementToRestore = elementToRestoreRef.current;

                if (document.body.contains(elementToRestore)) {
                    walker.currentNode = elementToRestore;

                    // Skip over elements within the scope, in case the scope immediately follows the node to restore.
                    do {
                        nextElement = next();
                    } while (nextElement === event.currentTarget || scope.isInScope(nextElement));

                    event.preventDefault();

                    if (!isNil(nextElement)) {
                        nextElement.focus();
                    } else {
                        // If there is no next element, blur the focused element to move focus to the element to restore.
                        focusedElement.blur();
                        elementToRestore.focus();
                    }
                }
            }
        }
    });

    useLayoutEffect(() => {
        if (!isDisabled) {
            return () => {
                if (scope.isInScope(document.activeElement)) {
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
