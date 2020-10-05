import { cssModule, getSize, mergeClasses } from "../../shared";
import { useFieldContext } from "../../field";

const GAP = {
    "horizontal": {
        "sm": 4,
        "md": 5,
        "lg": 6
    },
    "vertical": {
        "sm": 2,
        "md": 3,
        "lg": 4
    }
};

export function useGroupInput({
    role,
    cssModule: module,
    required,
    validationState,
    orientation,
    gap,
    wrap,
    size,
    reverse,
    disabled,
    className,
    ref
}) {
    const [{ hasLabel, hasMessage }] = useFieldContext();

    return {
        groupProps: {
            inline: reverse,
            orientation,
            alignItems: orientation === "vertical"
                ? reverse ? "end" : "start"
                : undefined,
            gap: gap ?? GAP[orientation][getSize(size)],
            wrap,
            className: mergeClasses(
                cssModule(
                    module,
                    hasLabel && "has-label",
                    hasMessage && "has-message"

                ),
                className
            ),
            role,
            "aria-required": required,
            "aria-invalid": validationState === "invalid",
            "aria-orientation": orientation,
            "aria-disabled": disabled,
            ref
        },
        itemProps: {
            size,
            reverse,
            validationState,
            disabled
        }
    };
}
