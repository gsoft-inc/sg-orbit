import { isString } from "lodash";
import { isValidElementType } from "react-is";
import { mergeProps } from "./mergeProps";
import { normalizeSize } from "./normalizeSize";
import React, { ElementType, HTMLAttributes, ReactElement, cloneElement } from "react";
import type { Size } from "./size";
import type { SizeAdapter } from "./createSizeAdapter";

type FixMe = any;

export function augmentElement<T extends string, P extends Record<string, any>>(element: ReactElement<P, T>, newProps: P) {
    const augmentedProps = mergeProps({ ...element.props, ref: (element as FixMe).ref }, newProps);

    return cloneElement(element, augmentedProps as FixMe);
}

export function createOrAugmentElement<T extends string, P extends HTMLAttributes<T>>(element: ReactElement<P, T> | ElementType, props: P) {
    if (isValidElementType(element) && !isString(element)) {
        const Type = element;

        return <Type {...props} />;
    }

    // The isString in the previous condition assume it can be possible that element is a string. however, if its the case, cloneElement does not support string, so it does not make sense
    // Therefore, since we are only typing the code and i don't want to introduce regression bugs, i will disable the ts compiler for that line
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return augmentElement(element, props);
}

export function createEmbeddableAdapter(sizeAdapter: SizeAdapter) {
    return <T extends string, P extends FixMe>(element: ReactElement<P, T>, { size, ...props }: { size: Size } & FixMe = {}) => {
        const newProps = {
            ...props,
            size: sizeAdapter[normalizeSize(size)]
        };

        return augmentElement(element, newProps);
    };
}
