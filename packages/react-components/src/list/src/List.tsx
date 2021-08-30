import "./List.css";

import { Box } from "../../box";
import { CollectionItem, NodeType, useCollection } from "../../collection";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, cssModule, mergeProps, useStyleProps } from "../../shared";
import { ListItem } from "./ListItem";

export interface InnerListProps extends InternalProps, ComponentProps<"ul"> {
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

function renderItem({
    key,
    elementType = ListItem,
    ref,
    content,
    props = {}
}: CollectionItem, size?: string) {
    return (
        <Box
            {...mergeProps<any>(
                props,
                {
                    size,
                    key,
                    as: elementType,
                    ref
                }
            )}
        >
            {content}
        </Box>
    );
}

const List = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => {
    const [styleProps] = useStyleProps("list");

    const {
        size,
        color,
        as,
        children,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    const nodes = useCollection(children);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-list",
                        size && "inherit-size",
                        color ? `color-${color}` : ""
                    ),
                    as,
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
        </Box>
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

export const OrderedList = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => (
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

export const UnorderedList = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

export type UnorderedListProps = ComponentProps<typeof UnorderedList>;
