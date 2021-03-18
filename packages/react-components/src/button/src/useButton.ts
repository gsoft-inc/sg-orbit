import { AriaAttributes, ForwardedRef } from "react";
import { MergedRef, Size, cssModule, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

export interface UseButtonProps {
    cssModule?: string;
    variant?: "solid" | "outline" | "ghost";
    color?: "primary" | "secondary" | "danger" | "inherit";
    shape?: "pill" | "rounded" | "circular";
    autoFocus?: boolean | number;
    fluid?: boolean;
    loading?: boolean;
    size?: Size;
    active?: boolean;
    focus?: boolean;
    hover?: boolean;
    type?: "button" | "submit" | "reset";
    forwardedRef?: ForwardedRef<any>;
}

export interface UseButtonReturn {
    className: string;
    type: UseButtonProps["type"];
    "aria-live": AriaAttributes["aria-live"];
    "aria-busy": boolean;
    ref: MergedRef<any>;
}

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
    forwardedRef
}: UseButtonProps): UseButtonReturn {
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
            )
        ),
        type,
        "aria-live": "polite",
        "aria-busy": loading,
        ref: buttonRef
    };
}
