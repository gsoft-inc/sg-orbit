import { isNil } from "lodash";
import { useEventCallback } from "../../shared";
import { useRef } from "react";

export function useFocusWithin({ onFocusWithin, onBlurWithin, isDisabled }) {
    const isFocusWithin = useRef();
    const activeElement = useRef();

    const onFocus = useEventCallback(event => {
        if (!isNil(onFocusWithin)) {
            onFocusWithin(event);
        }

        isFocusWithin.current = true;
        activeElement.current = document.activeElement;
    });

    const onBlur = useEventCallback(event => {
        // This is a fix to prevent the popper from closing when the dev tools opens. Opening the dev tools will cause a blur event since the popper
        // loose the focus in favor of the dev tools. Since this is the dev tools who receive the focused, no elements of the popper will be focused on
        // the next tick which will cause the popper to close.
        // To prevent the popper from closing we leverage the fact that opening the dev tools doesn't update document.activeElement.
        if (activeElement.current !== document.activeElement) {
            // We don't want to trigger onBlurWithin and then immediately onFocusWithin again when moving focus inside the element. Only trigger if the currentTarget doesn't
            // include the relatedTarget (where focus is moving).
            if (isFocusWithin && !event.currentTarget.contains(event.relatedTarget)) {
                if (!isNil(onBlurWithin)) {
                    onBlurWithin(event);
                }

                isFocusWithin.current = false;
            }
        }
    });

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

    return isDisabled ? {} : {
        onFocus,
        onBlur
    };
}
