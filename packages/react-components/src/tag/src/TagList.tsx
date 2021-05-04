import "./TagList.css";

import { Box } from "../../box";
import { Button } from "../../button";
import { CollectionItem, useCollection } from "../../collection";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent } from "react";
import { Tag, TagProps } from "./Tag";
import { forwardRef, isNil, mergeProps, useEventCallback } from "../../shared";

export interface InnerTagListProps {
    /**
     * A tag list can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Called when an item is removed from the list.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} key - The item key.
     * @returns {void}
     */
    onRemove?: (event: SyntheticEvent, key: string) => void;
    /**
     * Called when all items are cleared from the list.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClear?: (event: SyntheticEvent) => void;
    /**
     * Whether or not tag items should be render as readonly.
     */
    readOnly?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export interface TagItemProps extends Omit<TagProps, "children"> {
    item?: CollectionItem;
    size: "sm" | "md";
    onRemove: any;
    readOnly: boolean;
}

function TagItem({
    item,
    size,
    onRemove,
    readOnly,
    ...rest
}: TagItemProps) {
    const handleRemove = useEventCallback((event: SyntheticEvent) => {
        if (!isNil(onRemove)) {
            onRemove(event, item.key);
        }
    });

    return (
        <Tag
            {...mergeProps<Partial<TagProps>[]>(
                rest,
                {
                    variant: "outline",
                    size,
                    className: "o-ui-tag-list-item",
                    onRemove: !readOnly ? handleRemove : undefined
                }
            )}
        >
            {item.content}
        </Tag>
    );
}

export function InnerTagList({
    size,
    onRemove,
    onClear,
    readOnly,
    as = "div",
    forwardedRef,
    children,
    ...rest
}: InnerTagListProps) {
    const nodes = useCollection(children);

    const clearButtonMarkup = !isNil(onClear) && !readOnly && nodes.length > 0 && (
        <Button
            variant="ghost"
            size={size}
            onClick={onClear}
            className="o-ui-tag-list-clear-button"
        >
            Clear all
        </Button>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-tag-list",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {nodes.map((x: CollectionItem) => (
                <TagItem
                    key={x.key}
                    item={x}
                    size={size}
                    onRemove={onRemove}
                    readOnly={readOnly}
                />
            ))}
            {clearButtonMarkup}
        </Box>
    );
}

export const TagList = forwardRef<InnerTagListProps>((props, ref) => (
    <InnerTagList {...props} forwardedRef={ref} />
));

export type TagListProps = ComponentProps<typeof TagList>;

TagList.displayName = "TagList";
