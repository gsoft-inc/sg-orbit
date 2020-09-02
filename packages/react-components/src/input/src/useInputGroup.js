import { SIZE, useId } from "../../shared";
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

export function useInputGroup({
    role = "group",
    labelIdPrefix = "group-label",
    label,
    required,
    description,
    orientation,
    gap,
    wrap,
    size,
    reverse,
    readOnly,
    disabled,
    ref,
    ...rest
}) {
    const labelId = useId(undefined, labelIdPrefix);

    return {
        groupProps: {
            ...rest,
            role,
            "aria-readonly": readOnly,
            "aria-disabled": disabled,
            "aria-orientation": orientation,
            "aria-labelledby": labelId,
            ...(!label ? {} : {
                direction: "column",
                gap: 2
            }),
            ref: ref
        },
        itemsProps: {
            inline: reverse,
            direction: ITEMS_DIRECTION[orientation],
            alignItems: reverse ? "end" : "start",
            gap: gap ?? ITEMS_GAP_BY_SIZE[orientation][size ?? SIZE.medium],
            wrap: !isNil(wrap) ? "wrap" : undefined
        },
        labelProps: label && {
            id: labelId,
            required,
            description,
            size,
            children: label,
            as: "span"
        }
    };
}
