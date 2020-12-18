import { Children, useMemo } from "react";
import { Item, Section } from "../../placeholders";
import { isNil } from "lodash";
import { resolveChildren } from "../../shared";

export class CollectionBuilder {
    _parseSection(section, index, nextNodeIndex) {
        const { children, ...props } = section.props;

        const nodeIndex = nextNodeIndex();
        const that = this;

        const items = Children.map(children, (item, itemIndex) => that._parseItem(item, 2, itemIndex, nextNodeIndex));

        return {
            key: nodeIndex.toString(),
            index,
            level: 1,
            type: "section",
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: section.type !== Section ? section.type : undefined,
            ref: section.ref,
            props,
            items
        };
    }

    _parseItem(item, level, index, nextNodeIndex) {
        const nodeIndex = nextNodeIndex();

        const itemKey = !isNil(item.key) ? item.key.replace(".", "").replace("$", "") : nodeIndex.toString();

        return {
            key: nodeIndex.toString(),
            index,
            level,
            type: "item",
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: item.type !== Item ? item.type : undefined,
            ref: item.ref,
            itemKey,
            props: item.props
        };
    }

    build(children) {
        const elements = resolveChildren(children);

        let nodeIndex = 0;

        const nextNodeIndex = () => {
            return nodeIndex++;
        };

        const that = this;

        return Children.map(elements, (element, index) => {
            if (element.type === Section) {
                return that._parseSection(element, index, nextNodeIndex);
            }

            return that._parseItem(element, 1, index, nextNodeIndex);
        });
    }
}

export function useCollectionBuilder(children) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children), [builder, children]);
}
