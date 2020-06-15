import { isNil } from "lodash";

export function isNilOrEmpty(value) {
    return isNil(value) || value === "";
}
