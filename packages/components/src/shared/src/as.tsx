import { ComponentProps, ElementRef, ElementType, JSXElementConstructor, forwardRef } from "react";

import { Merge } from "type-fest";
import { mergeProps } from ".";

export interface AsOptions {
    normalizeStyles?: boolean;
}

export function as<A extends JSXElementConstructor<any>, B extends ElementType>(component: A, asProp: B, { normalizeStyles }: AsOptions = {}) {
    const Component = component as JSXElementConstructor<any>;

    return forwardRef<ElementRef<B>, Merge<ComponentProps<A>, ComponentProps<B>>>((props, ref) => (
        <Component
            {...mergeProps(
                props,
                {
                    as: asProp,
                    className: normalizeStyles ? "o-ui-element" : undefined,
                    ref
                }
            )}
        />
    ));
}
