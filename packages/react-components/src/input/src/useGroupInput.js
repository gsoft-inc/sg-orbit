import { cssModule, mergeClasses } from "../../shared";
import { useFieldContext } from "../../field";

const GAP = {
    horizontal: 6,
    vertical: 3
};

export function useGroupInput({
    role = "group",
    cssModule: module,
    required,
    validationState,
    orientation,
    gap,
    wrap,
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
            align: orientation === "vertical"
                ? reverse ? "end" : "start"
                : undefined,
            gap: gap ?? GAP[orientation],
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
            reverse,
            validationState,
            disabled
        }
    };
}
