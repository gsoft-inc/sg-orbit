import { cssModule, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

export function useButton({
    cssModule: module,
    variant,
    color,
    shape,
    autoFocus,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    type,
    className,
    forwardedRef
}) {
    const buttonRef = useMergedRefs(forwardedRef);

    useAutoFocus(buttonRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

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
                normalizeSize(size)
            ),
            className
        ),
        type,
        "aria-live": "polite",
        "aria-busy": loading,
        ref: buttonRef
    };
}
