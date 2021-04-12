import { CollectionNode, NodeType, isSection } from "./useCollection";
import { useMemo } from "react";

// Extracts all the nodes of "item" type.
// Loop through sections to find nested items.
export function useOnlyCollectionItems(nodes: CollectionNode[]) {
    return useMemo(() => {
        return nodes.reduce((acc, x) => {
            if (isSection(x)) {
                x.items
                    .filter(y => y.type === NodeType.item)
                    .forEach(z => {
                        acc.push(z);
                    });
            } else if (x.type === NodeType.item) {
                acc.push(x);
            }

            return acc;
        }, []);
    }, [nodes]);
}
