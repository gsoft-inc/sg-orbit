import { ComponentProps, ElementRef, JSXElementConstructor, forwardRef } from "react";
import { JsxElement, StyledSystemOverlappingHtmlAttributes } from "./types";
import { Merge } from "type-fest";

export function as<A extends JSXElementConstructor<any>, B extends JsxElement<any>>(component: A, asProp: B) {
    const Component = component as JSXElementConstructor<any>;

    // For an unknown reason, using StyledComponentProps instead of ComponentProps here introduce a huge performance problem for TS.
    return forwardRef<ElementRef<B>, Omit<Merge<ComponentProps<A>, ComponentProps<B>>, StyledSystemOverlappingHtmlAttributes>>((props, ref) => (
        <Component as={asProp} ref={ref} {...props} />
    ));
}
