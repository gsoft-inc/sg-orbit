import { KEYS, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useOverlayTrigger } from "./useOverlayTrigger";

/*
- Might become something else more specialized like a useMenuTrigger
- ** A useMenuTrigger would also be able to define behaviors like focusing the first item on arrow down key or the last item on arrow up key. **
*/

export function usePopoverTrigger(type, { isVisible, onToggle }) {
    const { triggerProps, overlayProps } = useOverlayTrigger(type, { isVisible });

    const toggle = event => {
        if (!isNil(onToggle)) {
            onToggle(event);
        }
    };

    const handleClick = useEventCallback(event => {
        toggle(event);
    });

    const handleKeyDown = useEventCallback(event => {
        switch(event.keyCode) {
            case KEYS.enter:
            case KEYS.space:
                event.preventDefault();
                toggle(event);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.keyCode === KEYS.space) {
            event.preventDefault();
        }
    });

    return {
        triggerProps: {
            ...triggerProps,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp
        },
        overlayProps
    };
}
