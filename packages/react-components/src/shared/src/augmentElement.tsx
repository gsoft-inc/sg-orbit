import { ElementType, HTMLAttributes, ReactElement, RefAttributes, cloneElement } from "react";
import { isString } from "lodash";
import { isValidElementType } from "react-is";
import { mergeProps } from "./mergeProps";
import { normalizeSize } from "./normalizeSize";
import type { SizeAdapter } from "./createSizeAdapter";

export function augmentElement(element: ReactElement & RefAttributes<any>, newProps: Record<string, any>): ReactElement {
    const augmentedProps = mergeProps({ ...element.props, ref: element.ref }, newProps);

    return cloneElement(element, augmentedProps);
}

export function createOrAugmentElement<T extends string, P extends HTMLAttributes<T>>(element: ReactElement<P, T> | ElementType, props: P): ReactElement {
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
    return <P extends Record<string, any>>(element: ReactElement<P, any>, { size, ...props }: P) => {
        const newProps = {
            ...props,
            size: sizeAdapter[normalizeSize(size)]
        };

        return augmentElement(element, newProps);
    };
}
