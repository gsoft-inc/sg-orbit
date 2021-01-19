import { FocusTarget, Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useOverlayTrigger } from "../../overlay";

export function usePopoverTrigger(isOverlayVisible, type, { onToggle }) {
    const { triggerProps, overlayProps } = useOverlayTrigger(isOverlayVisible, type);

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
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                toggle(event, FocusTarget.first);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.keyCode === Keys.space) {
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
