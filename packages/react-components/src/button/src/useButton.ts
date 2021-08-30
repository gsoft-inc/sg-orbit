import { AriaAttributes } from "react";
import { InteractionStatesProps, InternalProps, MergedRef, Size, cssModule, isNumber, mergeClasses, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";

export interface UseButtonProps extends Partial<InternalProps>, InteractionStatesProps {
    cssModule?: string;
    variant?: "solid" | "outline" | "ghost";
    color?: "primary" | "secondary" | "danger" | "inherit";
    shape?: "pill" | "rounded" | "circular";
    autoFocus?: boolean | number;
    fluid?: boolean;
    loading?: boolean;
    size?: Size;
    type?: "button" | "submit" | "reset";
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
    as,
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
        type: type ?? (as === "button" ? "button" : undefined),
        "aria-live": "polite",
        "aria-busy": loading,
        ref: buttonRef
    };
}
