import { ComponentProps, ElementRef, ElementType, JSXElementConstructor, forwardRef } from "react";
import { Merge } from "type-fest";

export function as<A extends JSXElementConstructor<any>, B extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>(component: A, asProp: B) {
    const Component = component as JSXElementConstructor<any>;

    return forwardRef<ElementRef<B>, Merge<ComponentProps<A>, ComponentProps<B>>>((props, ref) => (
        <Component ref={ref} as={asProp} {...props} />
    ));
}
