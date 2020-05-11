import { isNil } from "lodash";
import { string } from "prop-types";

export const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

export function tagPickerItem(text, value, group, additionalProps) {
    if (!isNil(additionalProps)) {
        return {
            text,
            value,
            group,
            ...additionalProps
        };
    }

    return {
        text,
        value,
        group
    };
}
