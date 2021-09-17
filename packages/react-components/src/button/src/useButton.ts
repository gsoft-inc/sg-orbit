import { AriaAttributes } from "react";
import { InteractionProps, InternalProps, MergedRef, Size, cssModule, isNumber, mergeClasses, mergeProps, normalizeSize, useAutoFocus, useMergedRefs } from "../../shared";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "inherit";

export type ButtonShape = "rounded" | "circular";

export interface UseButtonProps extends Partial<InternalProps>, InteractionProps {
    autoFocus?: boolean | number;
    cssModule?: string;
    fluid?: boolean;
    inherit?: boolean;
    loading?: boolean;
    shape?: ButtonShape;
    size?: Size;
    type?: "button" | "submit" | "reset";
    variant?: ButtonVariant;
}

export interface UseButtonReturn {
    "aria-busy": boolean;
    "aria-live": AriaAttributes["aria-live"];
    className: string;
    ref: MergedRef<any>;
    type: UseButtonProps["type"];
}

interface VariantStyle {
    color?: "primary" | "secondary" | "danger";
    shape?: "pill" | "rounded" | "circular";
    variant?: "solid" | "outline" | "ghost";
}

const VariantProps: Record<string, VariantStyle> = {
    danger: { color: "danger", shape: "pill", variant: "solid" },
    primary: { color: "primary", shape: "pill", variant: "solid" },
    secondary: { shape: "pill", variant: "outline" },
    tertiary: { shape: "pill", variant: "ghost" }
};

export function useButton({
    active,
    as,
    autoFocus,
    cssModule: module,
    fluid,
    focus,
    forwardedRef,
    hover,
    inherit,
    loading,
    shape: userShape,
    size,
    type,
    variant: userVariant
}: UseButtonProps): UseButtonReturn {
    const buttonRef = useMergedRefs(forwardedRef);

    useAutoFocus(buttonRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    const { color, shape, variant } = mergeProps({ shape: userShape }, VariantProps[userVariant] ?? {});

    return {
        "aria-busy": loading,
        "aria-live": "polite",
        className: mergeClasses(
            module,
            cssModule(
                "o-ui-button",
                variant,
                color,
                shape,
                inherit && "inherit-style",
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
