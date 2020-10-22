import { isNil } from "lodash";
import { useLayoutEffect } from "react";
import { walkFocusableElements } from "./focusableTreeWalker";

/*
Roving focus doesn't handle disabled element when using a key. If the calling component roving focus is based on a key, this is the responsability
of the calling component to ensure that the `currentKey` doesn't match a disabled element.
*/
export function useRovingFocus(rootRef, currentKey, { keyProp } = {}) {
    useLayoutEffect(() => {
        // Copy node to variable to ensure it's the same one on cleanup.
        const root = rootRef.current;
        const scope = [];

        // When in autofocus mode, elements tabIndex will be updated everytime a new element is focused.
        // When in manual mode, elements tabIndex will be updated only when the current key change.
        const autoFocus = isNil(keyProp);

        const handleFocus = event => {
            walkFocusableElements(root, x => {
                if (x.tabIndex === 0) {
                    x.tabIndex = -1;
                }
            });

            event.target.tabIndex = 0;
        };

        const addElement = (element, initialIndex = -1) => {
            scope.push(element);

            element.tabIndex = initialIndex;

            if (autoFocus) {
                element.addEventListener("focusin", handleFocus, { capture: true });
            }
        };

        const removeElement = (element, removeFromScope) => {
            const index = scope.indexOf(element);

            if (index !== -1) {
                if (autoFocus) {
                    element.removeEventListener("focusin", handleFocus, { capture: true });
                }

                if (removeFromScope) {
                    scope.splice(index, 1);
                }
            }
        };

        // Initialize elements.
        walkFocusableElements(root, (element, index) => {
            const initialIndex = !isNil(keyProp) && !isNil(currentKey)
                ? currentKey === element.getAttribute(keyProp) ? 0 : -1
                : index === 0 ? 0 : -1;

            addElement(element, initialIndex);
        });

        // Watch for dynamic elements.
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(x => {
                if (x.type === "childList") {
                    x.addedNodes.forEach(element => {
                        walkFocusableElements(element, y => addElement(y));
                    });

                    x.removedNodes.forEach(element => {
                        walkFocusableElements(element, y => removeElement(y, true));
                    });
                }
            });
        });

        mutationObserver.observe(root, {
            subtree: true,
            childList: true
        });

        return () => {
            scope.forEach(removeElement);
            mutationObserver.disconnect();
        };
    }, [rootRef, currentKey, keyProp]);
}
