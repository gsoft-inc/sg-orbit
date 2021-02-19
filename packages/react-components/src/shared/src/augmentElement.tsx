import { ElementType, HTMLAttributes, ReactElement, RefAttributes, cloneElement } from "react";
import { SizeAdapter, normalizeSize } from "./size";
import { isString } from "lodash";
import { isValidElementType } from "react-is";
import { mergeProps } from "./mergeProps";

export function augmentElement(element: ReactElement & RefAttributes<any>, newProps: Record<string, any>): ReactElement {
    const augmentedProps = mergeProps({ ...element.props, ref: element.ref }, newProps);

    return cloneElement(element, augmentedProps);
}

export function createOrAugmentElement<T extends string, Props extends HTMLAttributes<T>>(element: ReactElement<Props, T> | ElementType, props: Props): ReactElement {
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
    return <Props extends Record<string, any>>(element: ReactElement<Props, any>, { size, ...props }: Props) => {
        const newProps = {
            ...props,
            size: sizeAdapter[normalizeSize(size)]
        };

        return augmentElement(element, newProps);
    };
}
