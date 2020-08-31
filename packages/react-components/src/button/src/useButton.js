import { bemify, getSizeClass2, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

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
            bemify("o-ui-button",
                   variant && `--${variant}`,
                   color && `--${color}`,
                   shape && `--${shape}`,
                   fluid && "--fluid",
                   loading && "--loading",
                   active && "--active",
                   focus && "--focus",
                   hover && "--hover",
                   getSizeClass2(size)
            ),
            className
        ),
        disabled,
        ref: buttonRef
    };
}
