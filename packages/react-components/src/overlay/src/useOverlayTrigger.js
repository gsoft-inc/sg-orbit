import { Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";

export const Trigger = {
    click: "click",
    hover: "hover"
};

export function useOverlayTrigger(trigger, { onToggle }) {
    const toggle = (event, focusTarget) => {
        if (!isNil(onToggle)) {
            onToggle(event, focusTarget);
        }
    };

    const handleClick = useEventCallback(event => {
        event.preventDefault();
        toggle(event);
    });

    const handleKeyDown = useEventCallback(event => {
        switch(event.keyCode) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                toggle(event);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.keyCode === Keys.space) {
            event.preventDefault();
        }
    });

    const handleMouseEnter = useEventCallback(event => { toggle(event); });
    const handleMouseLeave = useEventCallback(event => { toggle(event); });
    const handleFocus = useEventCallback(event => { toggle(event); });
    const handleBlur = useEventCallback(event => { toggle(event); });

    return trigger === Trigger.hover
        // The overlay will show when the trigger is hovered with mouse or focus with keyboard.
        ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onFocus: handleFocus,
            onBlur: handleBlur
        }
        // The overlay will show on click or on "Enter" or "Space" keydown.
        : {
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp
        };
}
