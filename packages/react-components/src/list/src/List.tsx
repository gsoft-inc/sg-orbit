import "./List.css";

import { Box } from "../../box";
import { CollectionItem, NodeType, useCollection } from "../../collection";
import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";
import { InternalProps, JsxElement, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, useStyleProps } from "../../shared";
import { ListItem } from "./ListItem";

export type AbstractListProps<T extends JsxElement<T>> = InternalProps & StyledComponentProps<T> & {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A list can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * A list can vary in size.
     */
    size?: "inherit";
};

export interface InnerListProps extends Omit<AbstractListProps<"ul">, "as"> {
    /**
     * @ignore
     */
    as: ElementType | string;
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
            {...mergeProps(
                props,
                {
                    as: elementType,
                    key,
                    ref,
                    size
                }
            )}
        >
            {content}
        </Box>
    );
}

const List = forwardRef<any, OmitInternalProps<InnerListProps>>((props, ref) => {
    const [styleProps] = useStyleProps<InnerListProps>("list");

    const {
        as,
        children,
        color,
        size,
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
                    as,
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
        </Box>
    );
});

////////

const DefaultOrderedListElement = "ol";

export type InnerOrderedListProps = AbstractListProps<typeof DefaultOrderedListElement>;

export function InnerOrderedList({
    as = DefaultOrderedListElement,
    forwardedRef,
    ...rest
}: InnerOrderedListProps) {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

export const OrderedList = forwardRef<any, OmitInternalProps<InnerOrderedListProps>>((props, ref) => (
    <InnerOrderedList {...props} forwardedRef={ref} />
));

export type OrderedListProps = ComponentProps<typeof OrderedList>;

////////

const DefaultUnorderedListElement = "ul";

export type InnerUnorderedListProps = AbstractListProps<typeof DefaultUnorderedListElement>;

export function InnerUnorderedList({
    as = DefaultUnorderedListElement,
    forwardedRef,
    ...rest
}: InnerUnorderedListProps) {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

export const UnorderedList = forwardRef<any, OmitInternalProps<InnerUnorderedListProps>>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

export type UnorderedListProps = ComponentProps<typeof UnorderedList>;
