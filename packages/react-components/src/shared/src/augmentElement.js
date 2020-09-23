import { cloneElement } from "react";
import { getSize } from "./size";
import { isString } from "lodash";
import { isValidElementType } from "react-is";
import { mergeProps } from "./mergeProps";

export function augmentElement(element, newProps) {
    const augmentedProps = mergeProps({ ...element.props, ref: element.ref }, newProps);

    return cloneElement(element, augmentedProps);
}

export function createOrAugmentElement(element, props = {}) {
    if (isValidElementType(element) && !isString(element)) {
        const Type = element;

        return <Type {...props} />;
    }

    return augmentElement(element, props);
}

export function createEmbeddableAdapter(sizeAdapter) {
    return (element, { size, ...props } = {}) => {
        const newProps = {
            ...props,
            size: sizeAdapter[getSize(size)]
        };

        return augmentElement(element, newProps);
    };
}
