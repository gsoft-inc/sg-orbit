import { KEYS, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useOverlayTrigger } from "./useOverlayTrigger";

/*
- Might become something else more specialized like a useMenuTrigger
- ** A useMenuTrigger would also be able to define behaviors like focusing the first item on arrow down key or the last item on arrow up key. **
*/

export function usePopoverTrigger({ isVisible, onToggle, type }) {
    const { triggerProps, overlayProps } = useOverlayTrigger({ isVisible, type });

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

    return {
        triggerProps: {
            ...triggerProps,
            onClick: handleClick,
            onKeyDown: handleKeyDown
        },
        overlayProps
    };
}
