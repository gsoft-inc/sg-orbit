// @ts-nocheck

import { ElementRef, ElementType, forwardRef } from "react";
import { JsxElement, StyledComponentProps, mergeProps, useStyleProps, useStyledSystem } from "../../shared";

// Adding the "as" prop to the HTML element components is not an ideal solution but a necessary one for now until we completly remove "as" support from Orbit.
// We must do this, because a component like Button which support the "as" prop also need to use the HtmlButton component as a base element to benefit from our CSS normalizing.
export type HtmlElement<T extends JsxElement<T>> = StyledComponentProps<T> & {
    as?: ElementType;
};

// Not using Box otherwise it adds too many layers of components since these HTML elements components are also used in Orbit own components.
export function htmlElement<T extends JsxElement<T>>(name: string, elementType: T, className?: string) {
    return forwardRef<ElementRef<T>, HtmlElement<T>>((props, ref) => {
        const [styleProps] = useStyleProps<HtmlElement<T>>(name);

        const mergedProps = mergeProps(
            props,
            styleProps
        );

        const {
            as: As = elementType,
            children,
            ...rest
        } = useStyledSystem(mergedProps);


        return (
            <As
                {...mergeProps(
                    rest,
                    {
                        className,
                        ref
                    }
                )}
            >
                {children}
            </As>
        );
    });
}
