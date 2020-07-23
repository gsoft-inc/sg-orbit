import { getSizeClass, mergeClasses, useAutofocus, useMergedRefs } from "../../shared";
import { isNil } from "lodash";
import { useCallback } from "react";

export function useButton({
    variant,
    color,
    autofocus,
    autofocusDelay,
    fluid,
    circular,
    loading,
    size,
    active,
    focus,
    hover,
    disabled,
    className,
    ref,
    ...rest
}) {
    const buttonRef = useMergedRefs(ref);

    const setFocus = useCallback(() => {
        if (!isNil(buttonRef.current)) {
            buttonRef.current.focus();
        }
    }, [buttonRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    return {
        ...rest,
        ...autofocusProps,
        className: mergeClasses(
            variant,
            color && color,
            fluid && "fluid",
            circular && "circular",
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
