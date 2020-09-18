import { cssModule, getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export function useButton({
    cssModule: module,
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
    type,
    className,
    forwardedRef
}) {
    const buttonRef = useMergedRefs(forwardedRef);

    useAutoFocus(buttonRef, autoFocus, { delay: autoFocusDelay });

    return {
        className: mergeClasses(
            module,
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
                getSizeClass(size)
            ),
            className
        ),
        disabled,
        type,
        "aria-live": "polite",
        "aria-busy": loading,
        ref: buttonRef
    };
}
