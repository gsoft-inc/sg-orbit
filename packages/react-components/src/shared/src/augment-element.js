import { cloneElement } from "react";
import { createChainedFunction } from "./create-chained-function";
import { isFunction, isNil } from "lodash";
import { mergeClasses } from "./merge-classes";
import { mergeRefs } from "./merge-refs";

const cache = new WeakMap();

function memoizedMerge(x, y, merge) {
    if (cache.has(x)) {
        return cache.get(x);
    }

    cache.set(x, merge(y, x));

    return cache.get(x);
}

export function augmentElementProps(elementProps, newProps) {
    const props = { ...elementProps };

    Object.keys(newProps).forEach(x => {
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
    });

    return props;
}

export function augmentElement(element, newProps) {
    if (isNil(element)) {
        return null;
    }

    const augmentedProps = augmentElementProps({ ...element.props, ref: element.ref }, newProps);

    return cloneElement(element, augmentedProps);
}
