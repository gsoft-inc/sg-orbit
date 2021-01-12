import { Children, useMemo } from "react";
import { Item, Section } from "../placeholders";
import { isNil } from "lodash";
import { resolveChildren } from "../shared";

export class CollectionBuilder {
    _parseSection(section, index, nextNodeIndex) {
        const { children, ...props } = section.props;

        const nodeIndex = nextNodeIndex();
        const that = this;
        const items = Children.map(children, (item, itemIndex) => that._parseItem(item, itemIndex, nextNodeIndex));

        return {
            key: nodeIndex.toString(),
            index,
            type: "section",
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: section.type !== Section ? section.type : undefined,
            ref: section.ref,
            props,
            items
        };
    }

    _parseItem(item, index, nextNodeIndex) {
        const { children, ...props } = item.props;

        const nodeIndex = nextNodeIndex();
        const itemKey = !isNil(item.key) ? item.key.replace(".", "").replace("$", "") : nodeIndex.toString();

        return {
            key: nodeIndex.toString(),
            index,
            type: "item",
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: item.type !== Item ? item.type : undefined,
            ref: item.ref,
            itemKey,
            content: children,
            props
        };
    }

    build(children, renderProps) {
        const nodes = resolveChildren(children, renderProps);

        let nodeIndex = 0;

        const nextNodeIndex = () => {
            return nodeIndex++;
        };

        const that = this;

        return Children.map(nodes, (node, index) => {
            if (node.type === Section) {
                return that._parseSection(node, index, nextNodeIndex);
            }

            return that._parseItem(node, index, nextNodeIndex);
        });
    }
}

export function useCollectionBuilder(children, renderProps) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children, renderProps), [builder, children, renderProps]);
}
