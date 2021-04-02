import { CollectionItem, NodeType, isSection } from "./useCollection";

export function reduceCollection(nodes: CollectionItem[], acceptItem: (item: CollectionItem) => boolean): CollectionItem[] {
    return nodes.reduce((acc, node) => {
        if (isSection(node)) {
            const items = node.items.reduce((sectionItems, item) => {
                if (acceptItem(item)) {
                    sectionItems.push(item);
                }

                return sectionItems;
            }, []);

            if (items.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { items: _, ...sectionProps } = node;

                acc.push({
                    ...sectionProps,
                    items
                });
            }
        } else if (node.type === NodeType.item) {
            if (acceptItem(node)) {
                acc.push(node);
            }
        } else {
            acc.push(node);
        }

        return acc;
    }, []);
}
