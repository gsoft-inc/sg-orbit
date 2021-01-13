import { FocusTarget, KEYS, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useOverlayTrigger } from "./useOverlayTrigger";

/*
- Might want to add a more specialized one like useSelectTrigger if there are common feature between a Select and a ComboBox like an Autocomplete
- For example, a select should open and select the first or last value when using up or down arrows on a close select
- Hardcode type to listbox
*/

export function usePopoverTrigger(type, { isVisible, onToggle }) {
    const { triggerProps, overlayProps } = useOverlayTrigger(type, { isVisible });

    const toggle = (event, focusTarget) => {
        if (!isNil(onToggle)) {
            onToggle(event, focusTarget);
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
                toggle(event, FocusTarget.first);
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
