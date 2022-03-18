// The focus restore logic has been greatly inspired from: https://github.com/adobe/react-spectrum/blob/c2c187606d447a6daa185e0b0507c22883ab3147/packages/%40react-aria/focus/src/FocusScope.tsx#L324

// This restore focus hook only works because we use an animation to fade away the overlay. Without an animation, the active element will always be the body which
// will be out of scope. To fix this, it would probably requires this code to become a React element instead of a React hook.

import { FocusScope, Keys, createFocusableTreeWalker, getBodyElement, isNil, useEventCallback, useIsomorphicLayoutEffect, useRefState } from "../../shared";
import { KeyboardEvent } from "react";

import { isElementInViewport } from "./isElementInViewport";

export interface UseRestoreFocusOptions {
    isDisabled?: boolean;
}

function isTabbable(element: HTMLElement) {
    return element.getAttribute("tabindex") !== "-1";
}

// Restore focus feature doesn't work when clicking outside, this is by design.
export function useRestoreFocus(focusScope: FocusScope, { isDisabled }: UseRestoreFocusOptions = {}) {
    const [elementToRestoreRef, setElementToRestore] = useRefState<HTMLElement>();

    useIsomorphicLayoutEffect(() => {
        setElementToRestore(document.activeElement as HTMLElement);
    }, [isDisabled, setElementToRestore]);

    // Handle the tab key so that tabbing out of the scope goes to the next element after the node that had focus when the scope mounted.
    // This is important when using portals for overlays, so that focus goes to the expected element when tabbing out of the overlay.
    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.tab) {
            // Since stopImmediatePropagation doesn't work in React, it's a small hack to ensure this hook works well with useTrapFocus.
            if (!event.isPropagationStopped()) {
                const currentActiveElement = event.target;

                // When there are multiple overlay scopes (like a select in modal), we must ensure the right restore focus handle the event. We don't want nested overlay components
                // restore focus to be prevented by their parent.
                // E.g. we don't want the modal restore focus to handle the select restore focus.
                if (focusScope.isInScope(currentActiveElement as HTMLElement)) {
                    // Creating a tree walker to find what would be the next logical element to focus regardless if the current component is used in a focus trap setup or not.
                    // We cannot use the scope because the next logical element to focus might be outside the overlay, therefore outside of the scope.
                    // This is important to use a tree walker instead of creating a FocusScope because we are looking for an element at the document body level. Loading all these elements in a scope would be a performance killer.
                    const walker = createFocusableTreeWalker(getBodyElement(), { acceptElement: isTabbable });
                    walker.currentNode = currentActiveElement as Node;

                    const next = () => {
                        return event.shiftKey ? walker.previousNode() : walker.nextNode() as HTMLElement;
                    };

                    // Try to find the next logical element to focus after the currently focused element.
                    let nextElement = next() as HTMLElement;

                    // If the next logical element to focus is in the scope, we don't have to do anything, we can let the browser do his default tab behavior.
                    if (!focusScope.isInScope(nextElement)) {
                        const elementToRestore = elementToRestoreRef.current;

                        if (getBodyElement().contains(elementToRestore)) {
                            // If we haven't found an element or the element we found is not in the overlay scope, it might be a use case for some custom restore logic.
                            // Try to find a tabbable element next to the element to restore.
                            walker.currentNode = elementToRestore;

                            // Skip over elements within the scope, in case the scope immediately follows the node to restore.
                            do {
                                nextElement = next() as HTMLElement;
                            } while (nextElement === event.currentTarget || focusScope.isInScope(nextElement));

                            // Must prevent the browser from doing is thing since we will takeover and handle the tab ourself.
                            event.preventDefault();

                            if (!isNil(nextElement)) {
                                // If we found a tabbable element, focus the element and exit.
                                // This is a scenario where we restored the tab order. Instead of focusing the first element available under the overlay, we focus the element next to the overlay trigger.
                                nextElement.focus();
                            } else {
                                // If we can't find any tabbable element to focus, restore the focus on the overlay trigger element.
                                // This is also a scenario where we restored the tab order. Instead of focusing the first element available under the overlay, we made sure to focus back to the overlay trigger.
                                elementToRestore.focus();
                            }
                        }
                    }
                }
            }
        }
    });

    useIsomorphicLayoutEffect(() => {
        if (!isDisabled) {
            return () => {
                if (focusScope.isInScope(document.activeElement as HTMLElement)) {
                    // Don't move this line inside the frame.
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const elementToRestore = elementToRestoreRef.current;

                    requestAnimationFrame(() => {
                        if (getBodyElement().contains(elementToRestore)) {
                            if (isElementInViewport(elementToRestore)) {
                                elementToRestore.focus();
                            }
                        }
                    });
                }
            };
        }
    }, [focusScope, isDisabled, elementToRestoreRef]);

    return isDisabled ? {} : {
        onKeyDown: handleKeyDown
    };
}
