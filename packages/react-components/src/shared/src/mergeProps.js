import { createChainedFunction } from "./useChainedEventCallback";
import { isFunction, isNil, isUndefined } from "lodash";
import { mergeClasses } from "./mergeClasses";
import { mergeRefs } from "./useMergedRefs";

// TODO: support rest args.

export class CompositeKeyWeakMap {
    _root = new WeakMap();

    set(keys, value) {
        let node = this._root;

        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            const map = node.map || node;

            if (!map.has(key)) {
                const child = {
                    value: undefined,
                    map: new WeakMap()
                };

                map.set(key, child);
                node = child;
            } else {
                node = map.get(key);
            }
        }

        node.value = value;
    }

    get(keys) {
        let node = this._root;

        for (let i = 0; i < keys.length; i += 1) {
            node = (node.map || node).get(keys[i]);

            if (isUndefined(node)) {
                return undefined;
            }
        }

        return node.value;
    }

    has(keys) {
        return !isUndefined(this.get(keys));
    }
}

const cache = new CompositeKeyWeakMap();

function memoizedMerge(x, y, merge) {
    const key = [x, y];
    const value = cache.get(key);

    if (!isUndefined(value)) {
        return value;
    }

    const mergeResult = merge(y, x);

    cache.set(key, mergeResult);

    return mergeResult;
}

export function mergeProps(props, newProps) {
    props = { ...props };

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
                        props[x] = memoizedMerge(props[x], newProps[x], mergeRefs);
                    } else if (x.startsWith("on") && isFunction(props[x])) {
                        props[x] = memoizedMerge(props[x], newProps[x], createChainedFunction);
                    }
                } else {
                    props[x] = newProps[x];
                }
            }
        });

    return props;
}
