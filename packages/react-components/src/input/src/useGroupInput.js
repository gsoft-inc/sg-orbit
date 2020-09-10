import { SIZE } from "../../shared";
import { isNil } from "lodash";

// TODO:
// - rename to useGroupInput?

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
    role = "group",
    required,
    validationState,
    orientation,
    gap,
    wrap,
    size,
    reverse,
    disabled,
    ref
}) {
    return {
        groupProps: {
            role,
            inline: reverse,
            direction: ITEMS_DIRECTION[orientation],
            alignItems: reverse ? "end" : "start",
            gap: gap ?? ITEMS_GAP_BY_SIZE[orientation][size ?? SIZE.medium],
            wrap: !isNil(wrap) ? "wrap" : undefined,
            "aria-required": required,
            "aria-invalid": validationState === "invalid" ? true : undefined,
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
