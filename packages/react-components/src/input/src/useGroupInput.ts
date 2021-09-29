import { FlexAlignment, FlexOrientation } from "../../layout";
import { GapProp } from "@orbit-ui/styles";
import { Ref } from "react";
import { ValidationState } from "../../input";
import { cssModule, normalizeSize } from "../../shared";
import { useFieldContext } from "../../field";

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
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
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export interface UseGroupInputProps {
    cssModule?: string;
    disabled?: boolean;
    gap?: GapProp;
    groupRef: Ref<any>;
    isInField?: boolean;
    orientation?: FlexOrientation;
    required?: boolean;
    reverse?: boolean;
    role?: "group" | "radiogroup";
    size?: "sm" | "md";
    validationState?: ValidationState;
    wrap?: boolean;
}

export interface UseGroupInputReturn {
    groupProps: {
        align?: FlexAlignment;
        "aria-disabled"?: boolean;
        "aria-invalid"?: boolean;
        "aria-orientation"?: FlexOrientation;
        "aria-required"?: boolean;
        className?: string;
        gap?: GapProp;
        inline?: boolean;
        orientation?: FlexOrientation;
        ref?: Ref<any>;
        role?: "group" | "radiogroup";
        wrap?: boolean;
    };
    itemProps: {
        disabled?: boolean;
        reverse?: boolean;
        size?: "sm" | "md";
        validationState?: ValidationState;
    };
}

export function useGroupInput({
    cssModule: module,
    disabled,
    gap,
    groupRef,
    isInField,
    orientation,
    required,
    reverse,
    role = "group",
    size,
    validationState,
    wrap
}: UseGroupInputProps): UseGroupInputReturn {
    const [{ hasLabel, hasMessage }] = useFieldContext();

    return {
        groupProps: {
            align: orientation === "vertical"
                ? reverse ? "end" : "start"
                : undefined,
            "aria-disabled": disabled ? true : undefined,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            "aria-orientation": role !== "group" ? orientation : undefined,
            "aria-required": required ? true : undefined,
            className: cssModule(
                module,
                hasLabel && "has-label",
                hasMessage && "has-message"

            ),
            gap: gap ?? Gap[orientation][normalizeSize(size)],
            inline: reverse,
            orientation,
            ref: groupRef,
            role: !isInField ? role : undefined,
            wrap
        },
        itemProps: {
            disabled,
            reverse,
            size,
            validationState
        }
    };
}
