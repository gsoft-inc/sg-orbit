import { ComponentProps, ElementRef, ElementType, JSXElementConstructor, forwardRef } from "react";
import { Merge } from "type-fest";
import { StyledSystemOverlappingHtmlAttributes } from "./types";

export function as<A extends JSXElementConstructor<any>, B extends ElementType>(component: A, asProp: B) {
    const Component = component as JSXElementConstructor<any>;

    // For an unknown reason, using StyledComponentProps instead of ComponentProps here introduce a huge performance problem for TS.
    return forwardRef<ElementRef<B>, Omit<Merge<ComponentProps<A>, ComponentProps<B>>, StyledSystemOverlappingHtmlAttributes>>((props, ref) => (
        <Component as={asProp} ref={ref} {...props} />
    ));
}
