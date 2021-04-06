import { FocusEvent, KeyboardEvent, MouseEvent, RefObject, SyntheticEvent } from "react";
import { Keys, useEventCallback, useRefState } from "../../shared";
import { isDevToolsBlurEvent } from "./isDevtoolsBlurEvent";
import { isFunction, isNil } from "lodash";
import { useFocusWithin } from "./useFocusWithin";
import { useInteractOutside } from "./useInteractOutside";

export interface UseOverlayLightDismissProps {
    trigger?: "hover" | "click";
    onHide?(event: SyntheticEvent<HTMLElement, Event>): void;
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean | ((event: MouseEvent<HTMLElement, Event>) => void);
}

export function useOverlayLightDismiss(overlayRef: RefObject<HTMLElement>, {
    trigger = "click",
    onHide,
    hideOnEscape,
    hideOnLeave,
    hideOnOutsideClick
}: UseOverlayLightDismissProps) {
    const [isHandled, setIsHandled] = useRefState(false);

    const hide = (event: SyntheticEvent<HTMLElement, Event>) => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === Keys.esc) {
            if (hideOnEscape) {
                event.preventDefault();
                hide(event);
            }
        } else if (event.key === Keys.tab) {
            // Must handle tab out this way to be able to differiante them from trigger click.
            setIsHandled(true);
            hide(event);
        }
    };

    const handleBlur = useEventCallback((event: FocusEvent<HTMLElement>) => {
        // Sad hack, I am not sure why but keydown event occurs after blur event.
        setTimeout(() => {
            if (!isHandled.current) {
                if (!isDevToolsBlurEvent(overlayRef)) {
                    hide(event);
                }
            }

            setIsHandled(false);
        }, 0);
    });

    const handleMouseLeave = useEventCallback((event: MouseEvent<HTMLElement, Event>) => {
        hide(event);
    });

    const handleInteractOutside = useEventCallback((event: MouseEvent<HTMLElement, Event>) => {
        if (!isFunction(hideOnOutsideClick) || hideOnOutsideClick(event)) {
            hide(event);
        }
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
