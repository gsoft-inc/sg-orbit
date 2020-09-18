import { SIZE, cssModule, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const ITEMS_DIRECTION = {
    "horizontal": "row",
    "vertical": "column"
};

const ITEMS_GAP_BY_SIZE = {
    "horizontal": {
        [SIZE.small]: 4,
        [SIZE.medium]: 5,
        [SIZE.large]: 6
    },
    "vertical": {
        [SIZE.small]: 2,
        [SIZE.medium]: 3,
        [SIZE.large]: 4
    }
};

export function useGroupInput({
    cssModule: module,
    role = "group",
    required,
    validationState,
    orientation,
    gap,
    wrap,
    size,
    reverse,
    disabled,
    isInField,
    className,
    ref
}) {
    return {
        groupProps: {
            role,
            inline: reverse,
            direction: ITEMS_DIRECTION[orientation],
            alignItems: orientation === "vertical" ? reverse ? "end" : "start" : undefined,
            gap: gap ?? ITEMS_GAP_BY_SIZE[orientation][size ?? SIZE.medium],
            wrap: !isNil(wrap) ? "wrap" : undefined,
            className: mergeClasses(
                cssModule(
                    module,
                    isInField && "as-field"
                ),
                className
            ),
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
