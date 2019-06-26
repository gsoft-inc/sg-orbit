import { isNil } from "lodash";
import { string } from "prop-types";

export const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

export function toMultiSelectItem(text, value, group, obj) {
    if (!isNil(obj)) {
        return {
            text,
            value,
            group,
            ...obj
        };
    }

    return {
        text,
        value,
        group
    };
}
