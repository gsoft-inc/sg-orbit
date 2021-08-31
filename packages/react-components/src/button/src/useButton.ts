import { AriaAttributes } from "react";
import { InteractionProps, InternalProps, MergedRef, Size, cssModule, isNumber, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";

export interface UseButtonProps extends Partial<InternalProps>, InteractionProps {
    autoFocus?: boolean | number;
    color?: "primary" | "secondary" | "danger" | "inherit";
    cssModule?: string;
    fluid?: boolean;
    loading?: boolean;
    shape?: "pill" | "rounded" | "circular";
    size?: Size;
    type?: "button" | "submit" | "reset";
    variant?: "solid" | "outline" | "ghost";
}

export interface UseButtonReturn {
    "aria-busy": boolean;
    "aria-live": AriaAttributes["aria-live"];
    className: string;
    ref: MergedRef<any>;
    type: UseButtonProps["type"];
}

export function useButton({
    active,
    as,
    autoFocus,
    color,
    cssModule: module,
    fluid,
    focus,
    forwardedRef,
    hover,
    loading,
    shape,
    size,
    type,
    variant
}: UseButtonProps): UseButtonReturn {
    const buttonRef = useMergedRefs(forwardedRef);

    useAutoFocus(buttonRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    return {
        "aria-busy": loading,
        "aria-live": "polite",
        className: mergeClasses(
            module,
            cssModule(
                "o-ui-button",
                variant,
                color === "inherit" ? "inherit-color" : color,
                shape && shape,
                fluid && "fluid",
                loading && "loading",
                active && "active",
                focus && "focus",
                hover && "hover",
                normalizeSize(size)
            )
        ),
        ref: buttonRef,
        type: type ?? (as === "button" ? "button" : undefined)
    };
}
