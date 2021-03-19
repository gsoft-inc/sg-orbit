import "./TagList.css";

import { Box } from "../../box";
import { Button } from "../../button";
import { NodeShape, useCollection } from "../../collection";
import { Tag } from "../../tag";
import { any, arrayOf, func, object, oneOf, oneOfType, shape } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeProps, useEventCallback } from "../../shared";

const propTypes = {
    /**
     * Items to render.
     */
    items: arrayOf(object),
    /**
     * A collection of nodes to render instead of children. It should only be used if you embed a Menu inside another component.
     */
    nodes: arrayOf(shape(NodeShape)),
    /**
     * A tag list can vary in size.
     */
    size: oneOf(["sm", "md"]),
    onRemove: func,
    onClear: func,
    children: oneOfType([any, func])
};

function useCollectionNodes(children, items, nodes) {
    const collectionNodes = useCollection(children, { items });

    return nodes ?? collectionNodes;
}

function TagItem({
    item,
    size,
    onRemove,
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
                    onRemove: handleRemove
                }
            )}
        >
            {item.content}
        </Tag>
    );
}

function InnerTagList({
    items,
    nodes: nodesProp,
    size,
    onRemove,
    onClear,
    as = "div",
    forwardedRef,
    children,
    ...rest
}) {
    const nodes = useCollectionNodes(children, items, nodesProp);

    const clearButtonMarkup = nodes.length > 0 && (
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
