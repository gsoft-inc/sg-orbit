import { FocusEvent, KeyboardEvent, MouseEvent, RefObject, SyntheticEvent } from "react";
import { Keys, useEventCallback } from "../../shared";
import { isDevToolsBlurEvent } from "./isDevtoolsBlurEvent";
import { isNil } from "lodash";
import { useFocusWithin } from "./useFocusWithin";
import { useInteractOutside } from "./useInteractOutside";

export interface UseOverlayLightDismissOptions {
    trigger?: "hover" | "click";
    onHide?: (event: SyntheticEvent) => void;
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean | ((event: MouseEvent) => void);
}

export function useOverlayLightDismiss(overlayRef: RefObject<HTMLElement>, {
    trigger = "click",
    onHide,
    hideOnEscape,
    hideOnLeave,
    hideOnOutsideClick
}: UseOverlayLightDismissOptions) {
    const hide = (event: SyntheticEvent) => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.esc) {
            if (hideOnEscape) {
                event.preventDefault();
                hide(event);
            }
        }
    });

    const handleBlur = useEventCallback((event: FocusEvent) => {
        if (!isDevToolsBlurEvent(overlayRef)) {
            hide(event);
        }
    });

    const handleMouseLeave = useEventCallback((event: MouseEvent) => {
        hide(event);
    });

    const handleInteractOutside = useEventCallback((event: MouseEvent) => {
        hide(event);
    });

    useInteractOutside(overlayRef, {
        onInteractOutside: handleInteractOutside,
        isDisabled: !hideOnOutsideClick
    });

    const focusWithinProps = useFocusWithin({
        onBlur: handleBlur,
        isDisabled: !hideOnLeave
    });

    return {
        ...focusWithinProps,
        onMouseLeave: trigger === "hover" ? hideOnLeave ? handleMouseLeave : undefined : undefined,
        onKeyDown: handleKeyDown
    };
}

// This code aims to solve a bug on Chrome and Edge where no blur event will happen when the focused element becomes disable and that element lose the focus.
// More info at: https://allyjs.io/tutorials/mutating-active-element.html
// **** if using, try switching setTimeout for requestAnimationFrame ideally with useDisposable
// const handleDocumentBlur = useEventCallback(() => {
//     setTimeout(() => {
//         if (!isNil(document.activeElement) && document.activeElement.nodeName === "BODY") {
//             if (!isNil(activeElementRef.current) && activeElementRef.current.disabled) {
//                 setFocusPopper(() => {
//                     const containerElement = containerRef.current;

//                     if (!isNil(containerElement)) {
//                         containerElement.focus();
//                     }
//                 });
//             }
//         }
//     }, 0);
// });
// useDocumentListener("blur", handleDocumentBlur, !isDisabled && isFocusWithin.current, true);
