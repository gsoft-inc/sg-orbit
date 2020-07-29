const cache = new WeakMap();

import { createChainedFunction } from "./useChainedEventCallback";
import { isFunction, isUndefined } from "lodash";
import { mergeClasses } from "./mergeClasses";
import { mergeRefs } from "./useMergedRefs";

function memoizedMerge(x, y, merge) {
    if (cache.has(x)) {
        return cache.get(x);
    }

    cache.set(x, merge(y, x));

    return cache.get(x);
}

export function mergeProps(props, newProps) {
    props = { ...props };

    Object
        .keys(newProps)
        .forEach(x => {
            if (!isUndefined(newProps[x])) {
                if (!isUndefined(props[x])) {
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
