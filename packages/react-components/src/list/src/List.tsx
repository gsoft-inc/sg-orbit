import "./List.css";

import { CollectionItem, NodeType, useCollection } from "../../collection";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { ListItem } from "./ListItem";
import { cssModule, forwardRef, mergeProps, useStyleProps } from "../../shared";

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

function renderItem({
    key,
    elementType: As = ListItem,
    ref,
    content,
    props = {}
}: CollectionItem, size?: string) {
    return (
        <As
            {...mergeProps(
                props,
                {
                    size,
                    key,
                    ref
                }
            )}
        >
            {content}
        </As>
    );
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

    const nodes = useCollection(children);

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
            {nodes.map(node => {
                switch (node.type) {
                    case NodeType.item:
                        return renderItem(node as CollectionItem, size);
                    default:
                        return null;
                }
            })}
        </As>
    );
});

export type ListProps = ComponentProps<typeof List>;

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

export type OrderedListProps = ComponentProps<typeof OrderedList>;

////////

export function InnerUnorderedList({
    as = "ul",
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

export const UnorderedList = forwardRef<InnerListProps>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

export type UnorderedListProps = ComponentProps<typeof UnorderedList>;
