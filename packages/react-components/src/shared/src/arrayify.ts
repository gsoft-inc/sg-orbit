import { isArray } from "./assertions";

export function arrayify<T>(value: T | T[]) {
    return isArray(value) ? value : [value];
}
