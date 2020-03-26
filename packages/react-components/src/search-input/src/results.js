import { isNil } from "lodash";
import { string } from "prop-types";

export const RESULT_SHAPE = {
    id: string.isRequired,
    text: string.isRequired
};

export function searchInputResult(id, text, additionalProps) {
    if (isNil(additionalProps)) {
        return {
            id,
            text
        };
    }

    return {
        id,
        text,
        ...additionalProps
    };
}
