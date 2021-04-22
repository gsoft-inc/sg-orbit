import { CollectionItem, CollectionNode, useCollection } from "./useCollection";
import { ReactNode, SyntheticEvent, useCallback, useState } from "react";
import { getItemText } from "./getItemText";
import { isNil } from "../../shared";
import { reduceCollection } from "./reduceCollection";

function isQueryMatchingItem(query: string, item: CollectionItem) {
    const itemText = getItemText(item);

    return itemText.toLowerCase().startsWith(query);
}

function useNodesFiltering(nodes: CollectionNode[]): [CollectionItem[], (query: string) => void] {
    const [results, setResults] = useState<CollectionItem[]>([]);

    const filter = useCallback((query: string) => {
        const cache: Record<string, any> = {};

        query = query.toLowerCase();

        if (!isNil(cache[query])) {
            setResults(cache[query]);
        } else {
            const filteredNodes = reduceCollection(nodes, item => {
                return isQueryMatchingItem(query, item);
            });

            cache[query] = filteredNodes;

            setResults(filteredNodes);
        }
    }, [nodes, setResults]);

    return [results, filter];
}
interface UseCollectionSearchOptions {
    onSearch?: (event: SyntheticEvent, query: string) => void;
}

export function useCollectionSearch(children: ReactNode, { onSearch }: UseCollectionSearchOptions): [CollectionNode[], (event: SyntheticEvent, query: string) => void] {
    const nodes = useCollection(children);

    const [filteredNodes, filterNodes] = useNodesFiltering(nodes);

    // If a search function is provided, offload the search to the caller otherwise use the local filter function.
    const results = !isNil(onSearch) ? nodes : filteredNodes;

    const search = useCallback((event: SyntheticEvent, query: string) => {
        if (!isNil(onSearch)) {
            onSearch(event, query);
        } else {
            filterNodes(query);
        }
    }, [onSearch, filterNodes]);

    return [results, search];
}
