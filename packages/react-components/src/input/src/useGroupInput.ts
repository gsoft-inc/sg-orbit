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
} as const;

export interface UseGroupInputProps {
    role?: "group",
    cssModule?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
    orientation?: "horizontal" | "vertical";
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | string;
    wrap?: boolean;
    size?: "sm" | "md";
    reverse?: boolean;
    disabled?: boolean;
    groupRef: Ref<any>
}

export interface UseGroupInputReturn {
    groupProps: {
        inline?: boolean;
        orientation?: "horizontal" | "vertical";
        align?: "end" | "start"
        gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | string;
        wrap?: boolean;
        className?: string;
        role?: "group",
        "aria-required"?: boolean;
        "aria-invalid"?: boolean;
        "aria-orientation"?: "horizontal" | "vertical",
        "aria-disabled"?: boolean;
        ref?: Ref<any>
    },
    itemProps: {
        size?: "sm" | "md";
        reverse?: boolean;
        validationState?: "valid" | "invalid";
        disabled?: boolean;
    }
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
