import { FocusEvent, KeyboardEvent, MouseEvent, SyntheticEvent } from "react";
import { Keys, isNil, useEventCallback } from "../../shared";

export type OverlayTrigger = "none" | "click" | "hover";

export interface UseOverlayTriggerOptions {
    hideOnLeave?: boolean;
    trigger?: OverlayTrigger;
    onShow?: (event: SyntheticEvent) => void;
    onHide?: (event: SyntheticEvent) => void;
    isDisabled?: boolean;
}

export function useOverlayTrigger(isOpen: boolean, {
    hideOnLeave,
    trigger = "click",
    onShow,
    onHide,
    isDisabled
}: UseOverlayTriggerOptions = {}) {
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
                event.preventDefault();
                show(event);
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

    if (isDisabled) {
        return {};
    }

    switch (trigger) {
        case "click":
            // The overlay will show on click or on "Enter" or "Space" keydown.
            return {
                onClick: handleClick,
                onKeyDown: !isOpen ? handleKeyDown : undefined,
                onKeyUp: !isOpen ? handleKeyUp : undefined
            };
        case "hover":
            // The overlay will show when the trigger is hovered with mouse or focus with keyboard.
            return {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: hideOnLeave ? handleMouseLeave : undefined,
                onFocus: handleFocus,
                onBlur: hideOnLeave ? handleBlur : undefined
            };
        default:
            return {};
    }
}
