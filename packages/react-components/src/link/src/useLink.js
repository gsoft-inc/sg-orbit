import { cssModule, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

export function useLink({
    cssModule: module,
    omitSize,
    color,
    underline,
    shape,
    external,
    autoFocus,
    size,
    active,
    focus,
    hover,
    visited,
    target,
    rel,
    forwardedRef
}) {
    const linkRef = useMergedRefs(forwardedRef);

    useAutoFocus(linkRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

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
            )
        ),
        ref: linkRef
    };
}
