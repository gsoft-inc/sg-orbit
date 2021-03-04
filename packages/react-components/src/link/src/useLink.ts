import { ForwardedRef } from "react";
import { Size, cssModule, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

export interface UseLinkProps {
    cssModule?: string;
    omitSize?: boolean;
    color?: string;
    underline?: string;
    shape?: string;
    external?: boolean;
    autoFocus?: boolean | number;
    size?: Size;
    active?: boolean;
    focus?: boolean;
    hover?: boolean;
    visited?: boolean;
    target?: string;
    rel?: string;
    forwardedRef?: ForwardedRef<HTMLElement>;
}

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
}: UseLinkProps) {
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
