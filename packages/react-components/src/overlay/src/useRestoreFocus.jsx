import { KEYS, useEventCallback } from "../../shared";
import { useLayoutEffect } from "react";

/*
TODO:
    - when it close because of a tab key, it should go to the next tabbable element. View React spectrum https://github.com/adobe/react-spectrum/blob/c2c187606d447a6daa185e0b0507c22883ab3147/packages/%40react-aria/focus/src/FocusScope.tsx#L324
*/

// Accepting an isVisibleRef parameter because when the hook is disposing because it must know the CURRENT visibility state instead of the function closure visibility state
// that would likely be provided through the isDisabled prop.
export function useRestoreFocus(isVisibleRef, { isDisabled } = {}) {
    const handleKeyDown = useEventCallback(event => {
        // TODO: also support shift + tab (would take the previous element instead of the next)
        if (event.keyCode === KEYS.tab) {
            console.log("this is a tab");
        }
    }, []);

    useLayoutEffect(() => {
        const elementToRestore = document.activeElement;

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (!isDisabled && !isVisibleRef.current) {
                requestAnimationFrame(() => {
                    if (document.body.contains(elementToRestore)) {
                        elementToRestore?.focus();
                    }
                });
            }
        };
    }, [isVisibleRef, isDisabled]);

    return {
        onKeyDown: handleKeyDown
    };
}
