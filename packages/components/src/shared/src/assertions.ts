export function isNull(value: any): value is null {
    return value == null;
}

export function isUndefined(value: any): value is undefined {
    return typeof value === "undefined" || value === undefined;
}

export function isDefined(value: any) {
    return typeof value !== "undefined" && value !== undefined;
}

export function isNil(value: any): value is null | undefined {
    return isNull(value) || isUndefined(value);
}

export function isNilOrEmpty(value: any) {
    return isNil(value) || value === "";
}

export function isString(value: any): value is string {
    return Object.prototype.toString.call(value) === "[object String]";
}

export function isNumber(value: any): value is number {
    return typeof value === "number";
}

export function isArray<T>(value: any): value is Array<T> {
    return Array.isArray(value);
}

export function isEmptyArray(value: any) {
    return isArray(value) && value.length === 0;
}

export function isFunction(value: any): value is (...args: any) => any {
    return typeof value === "function";
}

export function isObject(value: any): value is Record<string, unknown> {
    return typeof value === "object" && !Array.isArray(value) && value != null;
}

export function isPlainObject(value: any): value is Record<string, any> {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);

    return prototype === null || prototype === Object.prototype;
}

export function isPromise(value: any) {
    return !isNil(value) && !isNil(value.then);
}
