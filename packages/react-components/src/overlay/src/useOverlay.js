import { Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useFocusWithin } from "./useFocusWithin";
import { useInteractOutside } from "./useInteractOutside";
import { useRef } from "react";

export function useOverlay({
    onHide,
    hideOnEscape,
    hideOnBlur,
    hideOnOutsideClick,
    canHide,
    overlayRef
}) {
    const activeElementRef = useRef();

    const hide = event => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = event => {
        if (event.keyCode === Keys.esc) {
            event.preventDefault();
            hide(event);
        }
    };

    const handleFocusWithin = useEventCallback(() => {
        activeElementRef.current = document.activeElement;
    });

    const handleBlurWithin = useEventCallback(event => {
        // This is a fix to prevent the popper from closing when the dev tools opens. Opening the dev tools will cause a blur event since the popper
        // loose the focus in favor of the dev tools. Since this is the dev tools who receive the focused, no elements of the popper will be focused on
        // the next tick which will cause the popper to close.
        // To prevent the popper from closing we leverage the fact that opening the dev tools doesn't update document.activeElement.
        if (activeElementRef.current !== document.activeElement) {
            if (isNil(canHide) || canHide(event.relatedTarget)) {
                hide(event);
            }
        }
    });

    const onInteractOutside = useEventCallback(event => {
        if (isNil(canHide) || canHide(event.target)) {
            hide(event);
        }
    });

    useInteractOutside(overlayRef, { onInteractOutside, isDisabled: !hideOnOutsideClick });

    const focusWithinProps = useFocusWithin({
        onFocusWithin: handleFocusWithin,
        onBlurWithin: handleBlurWithin,
        isDisabled: !hideOnBlur
    });

    return {
        overlayProps: {
            ...focusWithinProps,
            onKeyDown: hideOnEscape ? handleKeyDown : undefined,
            tabIndex: "-1"
        }
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
