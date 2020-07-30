import { getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";
import { isNil } from "lodash";
import { useCallback } from "react";

export function useButton({
    variant,
    color,
    shape,
    autoFocus,
    autoFocusDelay,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    disabled,
    className,
    forwardedRef
}) {
    const buttonRef = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(buttonRef.current)) {
            buttonRef.current.focus();
        }
    }, [buttonRef]);

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    return {
        ...autoFocusProps,
        className: mergeClasses(
            variant && variant,
            color && color,
            shape && shape,
            fluid && "fluid",
            loading && "loading",
            active && "active",
            focus && "focus",
            hover && "hover",
            getSizeClass(size),
            className
        ),
        disabled,
        ref: buttonRef
    };
}
