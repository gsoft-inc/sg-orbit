/**
 * Rename
 * @example
 * interface Object1 {
 *       value?: string;
 *       key: string;
 * }
 *
 * type Object2Renamed = PickRename<Object1, "value", "checkedValue">
 *
 * Object2 is now of type {
 *       checkedValue?: string;
 *       key: string;
 * }
 */
type PickRename<T, K extends keyof T, R extends PropertyKey> = {
    [P in keyof T as P extends K ? R : P]: T[P]
}

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
