import { ReactElement, RefAttributes, cloneElement } from "react";
import { Size, SizeAdapter, normalizeSize } from "./size";
import { mergeProps } from "./mergeProps";

export function augmentElement(element: ReactElement & RefAttributes<any>, newProps: Record<string, any>) {
    const augmentedProps = mergeProps({ ...element.props, ref: element.ref }, newProps);

    return cloneElement(element, augmentedProps);
}

export function createEmbeddableAdapter(sizeAdapter: SizeAdapter) {
    return <Props extends { size: Size } & Record<string, any>>(element: ReactElement<Props, any>, { size, ...props }: Props) => {
        const newProps = {
            ...props,
            size: sizeAdapter[normalizeSize(size)]
        };

        return augmentElement(element, newProps);
    };
}
