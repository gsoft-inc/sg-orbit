import { Children, forwardRef } from "react";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, cssModule, mergeProps, useStyleProps } from "../../shared";

const propTypes = {
    /**
     * A list can vary in size.
     */
    size: oneOf(["inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

const List = forwardRef((props, ref) => {
    const [styleProps] = useStyleProps("list");

    const {
        size,
        as: ElementType,
        children,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <ElementType
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-list",
                        size
                    ),
                    ref
                }
            )}
        >
            {Children.map(children, x => {
                return x && augmentElement(x, {
                    size
                });
            })}
        </ElementType>
    );
});

List.displayName = "List";

////////

export function InnerOrderedList({
    as = "ol",
    forwardedRef,
    ...rest
}) {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

InnerOrderedList.propTypes = propTypes;

export const OrderedList = forwardRef((props, ref) => (
    <InnerOrderedList {...props} forwardedRef={ref} />
));

OrderedList.displayName = "OrderedList";

////////

export function InnerUnorderedList({
    as = "ul",
    forwardedRef,
    ...rest
}) {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

InnerUnorderedList.propTypes = propTypes;

export const UnorderedList = forwardRef((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

UnorderedList.displayName = "UnorderedList";
