import { createChainedFunction } from "./useChainedEventCallback";
import { isFunction, isNil, isUndefined } from "lodash";
import { mergeClasses } from "./mergeClasses";
import { mergeRefs } from "./useMergedRefs";

interface Child<T> {
    value?: T,
    map: WeakMap<any, any>
}

// Useful to compose a weak map key with multiple objects.
export class CompositeKeyWeakMap<T> {
    _root = new WeakMap<any, any>();

    set(keys: any[], value: T) {
        let node: WeakMap<any, any> | Child<T> = this._root;

        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            const map: WeakMap<any, any> = (node as Child<T>).map || node as WeakMap<any, any>;

            if (!map.has(key)) {
                const child: Child<T> = {
                    value: undefined,
                    map: new WeakMap()
                };

                map.set(key, child);
                node = child;
            } else {
                node = map.get(key);
            }
        }

        (node as Child<T>).value = value;
    }

    get(keys: any[]) {
        let node: WeakMap<any, any> | Child<T> = this._root;

        for (let i = 0; i < keys.length; i += 1) {
            const map: WeakMap<any, any> = (node as Child<T>).map || node as WeakMap<any, any>;
            node = map.get(keys[i]);

            if (isUndefined(node)) {
                return node;
            }
        }

        return (node as Child<T>).value;
    }

    has(keys: any[]) {
        return !isUndefined(this.get(keys));
    }
}

////////

const cache = new CompositeKeyWeakMap<any>();

function memoMerge<TFirst, TSecond, TReturnValue>(x: TFirst, y: TSecond, fct: (y: TSecond, x: TFirst) => TReturnValue) {
    if (isNil(x) && isNil(y)) {
        return undefined;
    }

    if (isNil(x)) {
        return y;
    }

    if (isNil(y)) {
        return x;
    }

    const key = [x, y];
    const value = cache.get(key) as TReturnValue;

    if (!isUndefined(value)) {
        return value;
    }

    const mergeResult = fct(y, x);

    cache.set(key, mergeResult);

    return mergeResult;
}

function merge(props: any, newProps: any) {
    Object
        .keys(newProps)
        .forEach(x => {
            if (!isUndefined(newProps[x])) {
                if (!isNil(props[x])) {
                    if (x === "className") {
                        props[x] = mergeClasses(props[x], newProps[x]);
                    } else if (x === "style") {
                        props[x] = {
                            ...newProps[x],
                            ...props[x]
                        };
                    } else if (x === "ref") {
                        props[x] = memoMerge(props[x], newProps[x], mergeRefs);
                    } else if (x.startsWith("on") && isFunction(props[x])) {
                        props[x] = memoMerge(props[x], newProps[x], createChainedFunction);
                    }
                } else {
                    props[x] = newProps[x];
                }
            }
        });

    return props;
}

type Unpack<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export function mergeProps<T extends Record<string, any>[]>(...args: T) {
    let result = {};

    args.forEach(x => {
        result = merge(result, x);
    });

    return result as UnionToIntersection<Unpack<T>>;
}
