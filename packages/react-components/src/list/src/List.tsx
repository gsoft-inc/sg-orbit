import "./List.css";

import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { augmentElement, cssModule, forwardRef, mergeProps, useStyleProps } from "../../shared";

export interface InnerListProps {
    /**
     * A list can vary in size.
     */
    size?: "inherit";
    /**
     * A list can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

const List = forwardRef<InnerListProps>((props, ref) => {
    const [styleProps] = useStyleProps("list");

    const {
        size,
        color,
        as: As = "ul",
        children,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <As
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-list",
                        size && "inherit-size",
                        color ? `color-${color}` : ""
                    ),
                    ref
                }
            )}
        >
            {Children.map(children, x => {
                return x && augmentElement(x as ReactElement, {
                    size
                });

            })}
        </As>
    );
});

List.displayName = "List";

////////

export function InnerOrderedList({
    as = "ol",
    forwardedRef,
    ...rest
}: InnerListProps) {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

export const OrderedList = forwardRef<InnerListProps>((props, ref) => (
    <InnerOrderedList {...props} forwardedRef={ref} />
));

export type OrderedListProps = ComponentProps<typeof OrderedList>

OrderedList.displayName = "OrderedList";

////////

function InnerUnorderedList({
    as = "ul",
    forwardedRef,
    ...rest }
    : InnerListProps) {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

export const UnorderedList = forwardRef<InnerListProps>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

export type UnorderedListProps = ComponentProps<typeof UnorderedList>

UnorderedList.displayName = "UnorderedList";
