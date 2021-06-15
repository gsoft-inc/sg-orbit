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

    // Hotfix: https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    const handleMouseEnter = useEventCallback((event: MouseEvent) => {
        show(event);

        if (hideOnLeave) {
            // It's very important to attach the "mouseleave" handler to event.currentTarget (aka the element onMouseEnter is attached to)
            // and not event.target since onMouseEnter also fire for the children of the trigger (which it shouldn't according to
            // https://stackoverflow.com/questions/41745341/mouseenter-event-does-not-fire-when-entering-parent-from-child-element and
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event).
            // If the "mouseleave" handler is attached to event.target, it might be a child instead of the trigger and hide will be called even if the
            // cursor is still in the trigger.
            let target = event.currentTarget as HTMLElement;

            // HACK: The current strategy to show an overlay for a disabled trigger is to wrap the trigger in a div.
            // Strangely, when doing so, event.target is the disable trigger instead of the wrapper. This code ensure we resolve
            // the target to the wrapper instead of the original disabled trigger.
            if (target.hasAttribute("disabled")) {
                target = target.parentElement;
            }

            // HACK: A mouseleave event is not fired when the element have a disabled child. For more info view: https://github.com/facebook/react/issues/10396.
            // This is part of a work around to support a tooltip for a disabled button.
            target.addEventListener("mouseleave", handleMouseLeave);
        }
    });

    const handleMouseLeave = useEventCallback((event: any) => {
        hide(event);

        event.target.removeEventListener("mouseleave", handleMouseLeave);
    });

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
                onFocus: handleFocus,
                onBlur: hideOnLeave ? handleBlur : undefined
            };
        default:
            return {};
    }
}
