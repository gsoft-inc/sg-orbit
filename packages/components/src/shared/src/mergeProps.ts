import { UnionToIntersection } from "type-fest";
import { createChainedFunction } from "./useChainedEventCallback";
import { isFunction, isNil, isUndefined } from "./assertions";
import { mergeClasses } from "./mergeClasses";
import { mergeRefs } from "./useMergedRefs";

export interface CompositeKeyWeakMapNode<T> {
    map: WeakMap<any, any>;
    value?: T;
}

// Useful to compose a weak map key with multiple objects.
export class CompositeKeyWeakMap<T> {
    private root = new WeakMap<any, any>();

    set(keys: any[], value: T) {
        let node: WeakMap<any, any> | CompositeKeyWeakMapNode<T> = this.root;

        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            const map: WeakMap<any, any> = (node as CompositeKeyWeakMapNode<T>).map || node as WeakMap<any, any>;

            if (!map.has(key)) {
                const child: CompositeKeyWeakMapNode<T> = {
                    map: new WeakMap(),
                    value: undefined
                };

                map.set(key, child);
                node = child;
            } else {
                node = map.get(key);
            }
        }

        (node as CompositeKeyWeakMapNode<T>).value = value;
    }

    get(keys: any[]) {
        let node: WeakMap<any, any> | CompositeKeyWeakMapNode<T> = this.root;

        for (let i = 0; i < keys.length; i += 1) {
            const map: WeakMap<any, any> = (node as CompositeKeyWeakMapNode<T>).map || node as WeakMap<any, any>;
            node = map.get(keys[i]);

            if (isUndefined(node)) {
                return node;
            }
        }

        return (node as CompositeKeyWeakMapNode<T>).value;
    }

    has(keys: any[]) {
        return !isUndefined(this.get(keys));
    }
}

////////

const cache = new CompositeKeyWeakMap<any>();

function memoMerge<X, Y, Output>(x: X, y: Y, fct: (y: Y, x: X) => Output) {
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
    const value = cache.get(key) as Output;

    if (!isUndefined(value)) {
        return value;
    }

    const mergeResult = fct(y, x);

    cache.set(key, mergeResult);

    return mergeResult;
}

function merge(props: Record<string, any>, newProps: Record<string, any>) {
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

/*
Took from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379.

Convert an array of obj to a union of all the possibility.

Before:
[{
    a?: string;
    b?: string;
}, {
    c: string;
}, {
    d: boolean;
}]

After:
{
    a?: string;
    b?: string;
} | {
    c: string;
} | {
    d: boolean;
}
*/
export type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never;

interface Props {
    [key: string]: any;
}

export function mergeProps<T extends Props[]>(...args: T) {
    let result = {};

    args.forEach(x => {
        result = merge(result, x);
    });

    return result as UnionToIntersection<TupleTypes<T>>;
}

