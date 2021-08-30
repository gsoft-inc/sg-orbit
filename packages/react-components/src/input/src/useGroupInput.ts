import { GapProp, ValidationState, cssModule, normalizeSize } from "../../shared";
import { Orientation } from "../../layout";
import { Ref } from "react";
import { useFieldContext } from "../../field";

const Gap = {
    horizontal: {
        "sm": 4,
        "md": 5
    },
    vertical: {
        "sm": 2,
        "md": 3
    }
} as const;

export interface UseGroupInputProps {
    role?: "group" | "radiogroup";
    cssModule?: string;
    required?: boolean;
    validationState?: ValidationState;
    orientation?: Orientation;
    gap?: GapProp;
    wrap?: boolean;
    size?: "sm" | "md";
    reverse?: boolean;
    disabled?: boolean;
    groupRef: Ref<any>;
    isInField?: boolean;
}

export interface UseGroupInputReturn {
    groupProps: {
        inline?: boolean;
        orientation?: Orientation;
        align?: "end" | "start";
        gap?: GapProp;
        wrap?: boolean;
        className?: string;
        role?: "group" | "radiogroup";
        "aria-required"?: boolean;
        "aria-invalid"?: boolean;
        "aria-orientation"?: Orientation;
        "aria-disabled"?: boolean;
        ref?: Ref<any>;
    };
    itemProps: {
        size?: "sm" | "md";
        reverse?: boolean;
        validationState?: ValidationState;
        disabled?: boolean;
    };
}

export function useGroupInput({
    role = "group",
    cssModule: module,
    required,
    validationState,
    orientation,
    gap,
    wrap,
    size,
    reverse,
    disabled,
    isInField,
    groupRef
}: UseGroupInputProps): UseGroupInputReturn {
    const [{ hasLabel, hasMessage }] = useFieldContext();

    return {
        groupProps: {
            inline: reverse,
            orientation,
            align: orientation === "vertical"
                ? reverse ? "end" : "start"
                : undefined,
            gap: gap ?? Gap[orientation][normalizeSize(size)],
            wrap,
            className: cssModule(
                module,
                hasLabel && "has-label",
                hasMessage && "has-message"

            ),
            role: !isInField ? role : undefined,
            "aria-required": required ? true : undefined,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            "aria-orientation": role !== "group" ? orientation : undefined,
            "aria-disabled": disabled ? true : undefined,
            ref: groupRef
        },
        itemProps: {
            size,
            reverse,
            validationState,
            disabled
        }
    };
}
