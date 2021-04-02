import { CollectionItem, useCollection } from "./useCollection";
import { ReactNode, SyntheticEvent, useCallback, useState } from "react";
import { getItemText } from "./getItemText";
import { isNil } from "lodash";
import { reduceCollection } from "./reduceCollection";

function isQueryMatchingItem(query: string, item: CollectionItem) {
    const itemText = getItemText(item);

    return itemText.toLowerCase().startsWith(query);
}

function useNodeFilter(nodes: CollectionItem[]): [CollectionItem[], (query: string) => void] {
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

            setResults(filteredNodes);
        }
    }, [nodes, setResults]);

    return [results, filter];
}

interface UseCollectionSearchOptions {
    items?: CollectionItem[];
    onSearch?: any;
}

export function useCollectionSearch(children: ReactNode, { items, onSearch }: UseCollectionSearchOptions): [CollectionItem[], (event: SyntheticEvent, query: string) => void] {
    const nodes = useCollection(children, { items });

    const [filterResults, filterNodes] = useNodeFilter(nodes);

    // If a search function is provided, offload the search to the caller otherwise use the local filter function.
    const results = !isNil(onSearch) ? nodes : filterResults;

    const search = useCallback((event: SyntheticEvent, query: string) => {
        if (!isNil(onSearch)) {
            onSearch(event, query);
        } else {
            filterNodes(query);
        }
    }, [onSearch, filterNodes]);

    return [results, search];
}
