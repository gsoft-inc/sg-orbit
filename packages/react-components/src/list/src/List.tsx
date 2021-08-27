import "./List.css";

import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, augmentElement, cssModule, mergeProps, useStyleProps } from "../../shared";

const DefaultElement = "ul";

export interface InnerListProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * A list can vary in size.
     */
    size?: "inherit";
    /**
     * A list can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * React children.
     */
    children: ReactNode;
}

const List = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => {
    const [styleProps] = useStyleProps("list");

    const {
        size,
        color,
        as: As = DefaultElement,
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
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return x && augmentElement(x, {
                    size
                });

            })}
        </As>
    );
});

export type ListProps = ComponentProps<typeof List>;

List.displayName = "List";

////////

const orderedDefaultElement = "ol";

export function InnerOrderedList({
    as = orderedDefaultElement,
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

export const OrderedList = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => (
    <InnerOrderedList {...props} forwardedRef={ref} />
));

export type OrderedListProps = ComponentProps<typeof OrderedList>;

OrderedList.displayName = "OrderedList";

////////

function InnerUnorderedList({
    as = DefaultElement,
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

export const UnorderedList = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

export type UnorderedListProps = ComponentProps<typeof UnorderedList>;

UnorderedList.displayName = "UnorderedList";
