import { isNil } from "lodash";

export function selectItem(text, value, additionalProps) {
    if (!isNil(additionalProps)) {
        return {
            text,
            value,
            key: value,
            ...additionalProps
        };
    }

    return {
        text,
        value,
        key: value
    };
}
