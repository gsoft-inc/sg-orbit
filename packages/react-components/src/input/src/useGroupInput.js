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
}) {
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
