import { ForwardedRef } from "react";
import { InteractionStatesProps, cssModule, isNumber, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export interface UseLinkProps extends InteractionStatesProps {
    cssModule?: string;
    color?: string;
    underline?: string;
    shape?: string;
    external?: boolean;
    autoFocus?: boolean | number;
    visited?: boolean;
    target?: string;
    rel?: string;
    forwardedRef?: ForwardedRef<HTMLElement>;
}

export function useLink({
    cssModule: module,
    color,
    underline,
    shape,
    external,
    autoFocus,
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
                color === "inherit" ? "inherit-color" : color,
                underline,
                shape,
                active && "active",
                focus && "focus",
                hover && "hover",
                visited && "visited"
            )
        ),
        ref: linkRef
    };
}
