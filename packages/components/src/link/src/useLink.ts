import { ForwardedRef } from "react";
import { InteractionProps, cssModule, isNumber, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export type LinkVariant = "primary" | "secondary" | "danger";

export interface UseLinkProps extends InteractionProps {
    autoFocus?: boolean | number;
    cssModule?: string;
    disabled?: boolean;
    external?: boolean;
    forwardedRef?: ForwardedRef<HTMLElement>;
    rel?: string;
    shape?: string;
    target?: string;
    underline?: string;
    variant?: LinkVariant;
    visited?: boolean;
}

export function useLink({
    active,
    autoFocus,
    cssModule: module,
    disabled,
    external,
    focus,
    forwardedRef,
    hover,
    rel,
    shape,
    target,
    underline,
    variant,
    visited
}: UseLinkProps) {
    const linkRef = useMergedRefs(forwardedRef);

    useAutoFocus(linkRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    return {
        linkProps: {
            className: mergeClasses(
                module,
                cssModule(
                    "o-ui-link",
                    variant,
                    underline === "none" ? "no-underline" : underline,
                    shape,
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    visited && "visited",
                    disabled && "disabled"
                )
            ),
            ref: linkRef,
            rel: rel ?? (external ? "noopener noreferrer" : undefined),
            tabIndex: disabled ? -1 : undefined,
            target: target ?? (external ? "_blank" : undefined)
        },
        showNewTabIndicator: target === "_blank"
    };
}
