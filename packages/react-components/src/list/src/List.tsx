import "./List.css";

import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";
import { augmentElement, cssModule, mergeProps, useStyleProps } from "../../shared";

const defaultElement = "ul";

export interface InnerListProps extends ComponentProps<typeof defaultElement>{
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

const List = forwardRef<any, Omit<InnerListProps, "forwardedRef">>((props, ref) => {
    const [styleProps] = useStyleProps("list");

    const {
        size,
        color,
        as: As = defaultElement,
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

export const OrderedList = forwardRef<any, Omit<InnerListProps, "forwardedRef">>((props, ref) => (
    <InnerOrderedList {...props} forwardedRef={ref} />
));

export type OrderedListProps = ComponentProps<typeof OrderedList>;

OrderedList.displayName = "OrderedList";

////////

function InnerUnorderedList({
    as = defaultElement,
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

export const UnorderedList = forwardRef<any, Omit<InnerListProps, "forwardedRef">>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

export type UnorderedListProps = ComponentProps<typeof UnorderedList>;

UnorderedList.displayName = "UnorderedList";
