import { getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

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

    useAutoFocus(buttonRef, autoFocus, { delay: autoFocusDelay });

    return {
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
