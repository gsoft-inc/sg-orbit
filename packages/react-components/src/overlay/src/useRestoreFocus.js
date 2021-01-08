// The focus restore logic has been greatly inspired from: https://github.com/adobe/react-spectrum/blob/c2c187606d447a6daa185e0b0507c22883ab3147/packages/%40react-aria/focus/src/FocusScope.tsx#L324

import { KEYS, createFocusableTreeWalker, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useLayoutEffect, useRef } from "react";

export function useRestoreFocus(scope, { isDisabled } = {}) {
    const elementToRestoreRef = useRef();

    // The dispose code runs after the tabbed out code which always move the focus to the element to restore. This flag is used to prevent this.
    const hasTabbedRef = useRef(false);

    useLayoutEffect(() => {
        elementToRestoreRef.current = document.activeElement;
    }, [isDisabled]);

    // Handle the tab key so that tabbing out of the scope goes to the next element after the node that had focus when the scope mounted.
    // This is important when using portals for overlays, so that focus goes to the expected element when tabbing out of the overlay.
    const handleKeyDown = useEventCallback(event => {
        if (event.keyCode === KEYS.tab) {
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

                    hasTabbedRef.current = true;
                }
            }
        }
    });

    useLayoutEffect(() => {
        if (!isDisabled) {
            return () => {
                if (!scope.isInScope(document.activeElement) && !hasTabbedRef.current) {
                    // Don't move inside the frame.
                    const elementToRestore = elementToRestoreRef.current;

                    requestAnimationFrame(() => {
                        if (document.body.contains(elementToRestore)) {
                            elementToRestore.focus();
                        }
                    });
                }

                hasTabbedRef.current = false;
            };
        }
    }, [scope, isDisabled]);

    return isDisabled ? {} : {
        onKeyDown: handleKeyDown
    };
}
