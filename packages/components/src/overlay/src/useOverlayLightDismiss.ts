import { FocusEvent, KeyboardEvent, MouseEvent, SyntheticEvent } from "react";
import { FocusScope, Keys, isNil, useEventCallback, useFocusWithin } from "../../shared";

import { OverlayTrigger } from "./useOverlayTrigger";
import { isDevToolsBlurEvent } from "./isDevtoolsBlurEvent";
import { useInteractOutside } from "./useInteractOutside";

export interface UseOverlayLightDismissOptions {
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean | ((event: MouseEvent) => void);
    isDisabled?: boolean;
    onHide?: (event: SyntheticEvent) => void;
    trigger?: OverlayTrigger;
}

export function useOverlayLightDismiss(focusScope: FocusScope, {
    hideOnEscape,
    hideOnLeave,
    hideOnOutsideClick,
    isDisabled,
    onHide,
    trigger = "click"
}: UseOverlayLightDismissOptions = {}) {
    const hide = (event: SyntheticEvent) => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.esc) {
            if (hideOnEscape) {
                const currentActiveElement = event.target;

                // When there are multiple overlay scopes (like a select in modal), we must ensure the esc keydown event is handled by the right component.
                // We don't want nested all overlay components to close because a nested overlay component esc keydown event happended.
                // E.g. we don't want the modal to close because an esc keydown event happened for the select.
                if (focusScope.isInScope(currentActiveElement as HTMLElement)) {
                    event.preventDefault();
                    hide(event);
                }
            }
        }
    });

    const handleBlur = useEventCallback((event: FocusEvent) => {
        if (!isDevToolsBlurEvent(focusScope)) {
            hide(event);
        }
    });

    const handleMouseLeave = useEventCallback((event: MouseEvent) => {
        hide(event);
    });

    const handleInteractOutside = useEventCallback((event: MouseEvent) => {
        hide(event);
    });

    useInteractOutside(focusScope, {
        isDisabled: isDisabled || !hideOnOutsideClick,
        onInteractOutside: handleInteractOutside
    });

    const focusWithinProps = useFocusWithin({
        isDisabled: isDisabled || !hideOnLeave,
        onBlur: handleBlur
    });

    if (isDisabled) {
        return {};
    }

    switch (trigger) {
        case "click":
            return {
                ...focusWithinProps,
                onKeyDown: handleKeyDown
            };
        case "hover":
            return {
                ...focusWithinProps,
                onKeyDown: handleKeyDown,
                onMouseLeave: hideOnLeave ? handleMouseLeave : undefined
            };
        default:
            return {};
    }
}
