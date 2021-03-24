import { KeyboardEvent, SyntheticEvent } from "react";
import { Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";

export interface UseOverlayTriggerProps {
    trigger?: "click" | "hover";
    onToggle?(event: SyntheticEvent): void;
    onShow?(event: SyntheticEvent): void;
    onHide?(event: SyntheticEvent): void;
}

export function useOverlayTrigger({ trigger = "click", onToggle, onShow, onHide }: UseOverlayTriggerProps = {}) {
    const toggle = (event: SyntheticEvent) => {
        if (!isNil(onToggle)) {
            onToggle(event);
        }
    };

    const show = (event: SyntheticEvent) => {
        if (!isNil(onShow)) {
            onShow(event);
        }
    };

    const hide = (event: SyntheticEvent) => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleClick = useEventCallback((event: SyntheticEvent) => {
        event.preventDefault();
        toggle(event);
    });

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        switch (event.key) {
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
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    const handleMouseEnter = useEventCallback(event => { show(event); });
    const handleMouseLeave = useEventCallback(event => { hide(event); });
    const handleFocus = useEventCallback(event => { show(event); });
    const handleBlur = useEventCallback(event => { hide(event); });

    switch (trigger) {
        case "click":
            // The overlay will show on click or on "Enter" or "Space" keydown.
            return {
                onClick: handleClick,
                onKeyDown: handleKeyDown,
                onKeyUp: handleKeyUp
            };
        case "hover":
            // The overlay will show when the trigger is hovered with mouse or focus with keyboard.
            return {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                onFocus: handleFocus,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown
            };
        default:
            return {};
    }
}
