import { cssModule, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";

export function useLink({
    cssModule: module,
    omitSize,
    color,
    underline,
    shape,
    external,
    autoFocus,
    autoFocusDelay,
    size,
    active,
    focus,
    hover,
    visited,
    target,
    rel,
    className,
    forwardedRef
}) {
    const linkRef = useMergedRefs(forwardedRef);

    useAutoFocus(linkRef, { isDisabled: !autoFocus, delay: autoFocusDelay });

    return {
        target: target ?? external ? "_blank" : undefined,
        rel: rel ?? external ? "noopener noreferrer" : undefined,
        className: mergeClasses(
            module,
            cssModule(
                "o-ui-link",
                color,
                underline,
                shape,
                active && "active",
                focus && "focus",
                hover && "hover",
                visited && "visited",
                !omitSize && normalizeSize(size)
            ),
            className
        ),
        ref: linkRef
    };
}
