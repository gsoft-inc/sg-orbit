import { ElementRef, JSXElementConstructor, forwardRef, useMemo } from "react";
import { JsxElement } from "./types";
import { Merge } from "type-fest";
import { StyledComponentProps } from "./types";

export function as<A extends JSXElementConstructor<any>, B extends JsxElement<any>>(component: A, asProp: B) {
    const Component = component as JSXElementConstructor<any>;

    return forwardRef<ElementRef<B>, Merge<StyledComponentProps<A>, StyledComponentProps<B>>>((props, ref) => (
        <Component as={asProp} ref={ref} {...props} />
    ));
}

// Intended to be used inside components render function when asProp needs to be dynamic.
// However, use with caution since React emited the following warning: "You may rely on useMemo as a performance optimization, not as a semantic guarantee."
export function useAs<A extends JSXElementConstructor<any>, B extends JsxElement<any>>(component: A, asProp: B) {
    return useMemo(() => as(component, asProp), [component, asProp]);
}
