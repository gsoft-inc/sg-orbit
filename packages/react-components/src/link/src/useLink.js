import { cssModule, getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export function useLink({
    cssModule: module,
    color,
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

    useAutoFocus(linkRef, autoFocus, { delay: autoFocusDelay });

    return {
        target: target ?? external ? "_blank" : undefined,
        rel: rel ?? external ? "noopener noreferrer" : undefined,
        className: mergeClasses(
            cssModule(
                module,
                color,
                active && "active",
                focus && "focus",
                hover && "hover",
                visited && "visited",
                getSizeClass(size)
            ),
            className
        ),
        ref: linkRef
    };
}
