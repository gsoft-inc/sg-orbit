import "./TagList.css";

import { Box } from "../../box";
import { Button } from "../../button";
import { Tag } from "./Tag";
import { any, arrayOf, bool, func, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeProps, useEventCallback } from "../../shared";
import { useCollection } from "../../collection";

const propTypes = {
    /**
     * Items to render.
     */
    items: arrayOf(object),
    /**
     * A tag list can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * Called when an item is removed from the list.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} key - The item key.
     * @returns {void}
     */
    onRemove: func,
    /**
     * Called when all items are cleared from the list.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClear: func,
    /**
     * Whether or not tag items should be render as readonly.
     */
    readOnly: bool,
    /**
     * React children.
     */
    children: oneOfType([any, func])
};

function TagItem({
    item,
    size,
    onRemove,
    readOnly,
    ...rest
}) {
    const handleRemove = useEventCallback(event => {
        if (!isNil(onRemove)) {
            onRemove(event, item.key);
        }
    });

    return (
        <Tag
            {...mergeProps(
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
    items,
    size,
    onRemove,
    onClear,
    readOnly,
    as = "div",
    forwardedRef,
    children,
    ...rest
}) {
    const nodes = useCollection(children, { items });

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
            {nodes.map(x => (
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

InnerTagList.propTypes = propTypes;

export const TagList = forwardRef((props, ref) => (
    <InnerTagList {...props} forwardedRef={ref} />
));

TagList.displayName = "TagList";
