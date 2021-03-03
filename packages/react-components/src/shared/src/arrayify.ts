export function arrayify<T>(value: T | T[]) {
    return Array.isArray(value) ? value : [value];
}
