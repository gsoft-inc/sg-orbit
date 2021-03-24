import { Ref } from "react";
import { cssModule, normalizeSize } from "../../shared";
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
};

export interface UseGroupInputProps {
    role?: "group",
    cssModule?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
    orientation?: "horizontal" | "vertical";
    gap?: number
    wrap?: boolean;
    size?: "sm" | "md";
    reverse?: boolean;
    disabled?: boolean;
    groupRef: Ref<any>
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
    groupRef
}: UseGroupInputProps) {
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
            role,
            "aria-required": required ? true : undefined,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            "aria-orientation": orientation,
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
