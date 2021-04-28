import { FocusEvent, KeyboardEvent, MouseEvent, SyntheticEvent } from "react";
import { Keys, isNil, useEventCallback } from "../../shared";

export interface UseOverlayTriggerOptions {
    trigger?: "click" | "hover";
    onShow?: (event: SyntheticEvent) => void;
    onHide?: (event: SyntheticEvent) => void;
}

export function useOverlayTrigger(isOpen: boolean, { trigger = "click", onShow, onHide }: UseOverlayTriggerOptions = {}) {
    const toggle = (event: SyntheticEvent) => {
        if (isOpen) {
            hide(event);
        } else {
            show(event);
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
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    const handleMouseEnter = useEventCallback((event: MouseEvent) => { show(event); });
    const handleMouseLeave = useEventCallback((event: MouseEvent) => { hide(event); });
    const handleFocus = useEventCallback((event: FocusEvent) => { show(event); });
    const handleBlur = useEventCallback((event: FocusEvent) => { hide(event); });

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
                onBlur: handleBlur
            };
        default:
            return {};
    }
}
