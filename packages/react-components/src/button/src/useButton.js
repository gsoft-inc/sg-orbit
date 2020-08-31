import { cssModule, getSizeClass3, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

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
            cssModule(
                "o-ui-button",
                variant,
                color && color,
                shape && shape,
                fluid && "fluid",
                loading && "loading",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass3(size)
            ),
            className
        ),
        disabled,
        ref: buttonRef
    };
}
