import { isNil } from "lodash";

export function isNullOrEmpty(value) {
    return isNil(value) || value === "";
}

export function isNotNullOrEmpty(value) {
    return !isNullOrEmpty(value);
}
