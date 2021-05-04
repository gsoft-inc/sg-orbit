import { isArray, isNil } from "./assertions";

export function arrayify<T>(value: T | T[]) {
    if (isNil(value)) {
        return [];
    }

    return isArray(value) ? value : [value];
}
