import { ComponentProps, ElementRef, JSXElementConstructor, forwardRef } from "react";
import { JsxElement } from "./types";
import { Merge } from "type-fest";

export function as<A extends JSXElementConstructor<any>, B extends JsxElement<any>>(component: A, asProp: B) {
    const Component = component as JSXElementConstructor<any>;

    return forwardRef<ElementRef<B>, Merge<ComponentProps<A>, ComponentProps<B>>>((props, ref) => (
        <Component as={asProp} ref={ref} {...props} />
    ));
}
