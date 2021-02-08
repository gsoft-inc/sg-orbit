import { Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";

export function useOverlayTrigger({ trigger = "click", onToggle, onShow, onHide } = {}) {
    const toggle = event => {
        if (!isNil(onToggle)) {
            onToggle(event);
        }
    };

    const show = event => {
        if (!isNil(onShow)) {
            onShow(event);
        }
    };

    const hide = event => {
        if (!isNil(onHide)) {
            onHide(event);
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
                if (trigger === "click") {
                    event.preventDefault();
                    show(event);
                }
                break;
            case Keys.esc:
                event.preventDefault();
                hide(event);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.keyCode === Keys.space) {
            event.preventDefault();
        }
    });

    const handleMouseEnter = useEventCallback(event => { show(event); });
    const handleMouseLeave = useEventCallback(event => { hide(event); });
    const handleFocus = useEventCallback(event => { show(event); });
    const handleBlur = useEventCallback(event => { hide(event); });

    return trigger === "hover"
        // The overlay will show when the trigger is hovered with mouse or focus with keyboard.
        ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown
        }
        // The overlay will show on click or on "Enter" or "Space" keydown.
        : {
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp
        };
}
