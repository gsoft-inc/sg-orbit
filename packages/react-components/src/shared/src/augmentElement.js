import { cloneElement } from "react";
import { createChainedFunction } from "./createChainedFunction";
import { isFunction, isNil } from "lodash";
import { isString } from "lodash";
import { isValidElementType } from "react-is";
import { mergeClasses } from "./mergeClasses";
import { mergeRefs } from "./mergeRefs";

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
    const augmentedProps = augmentElementProps({ ...element.props, ref: element.ref }, newProps);

    return cloneElement(element, augmentedProps);
}

export function createOrAugmentElement(element, props = {}) {
    if (isValidElementType(element) && !isString(element)) {
        const Type = element;

        return <Type {...props} />;
    }

    return augmentElement(element, props);
}
