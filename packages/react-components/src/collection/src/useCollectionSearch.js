import { getItemText } from "./getItemText";
import { isNil } from "lodash";
import { reduceCollection } from "./reduceCollection";
import { useCallback, useState } from "react";
import { useCollection } from "./useCollection";

function isQueryMatchingItem(query, item) {
    const itemText = getItemText(item);

    return itemText.toLowerCase().startsWith(query);
}

function useNodeFilter(nodes) {
    const [results, setResults] = useState([]);

    const filter = useCallback(query => {
        const cache = {};

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

export function useCollectionSearch(children, { onSearch }) {
    const nodes = useCollection(children);

    const [filterResults, filterNodes] = useNodeFilter(nodes);

    // If a search function is provided, offload the search to the caller otherwise use the local filter function.
    const results = !isNil(onSearch) ? nodes : filterResults;

    const search = useCallback((event, query) => {
        if (!isNil(onSearch)) {
            onSearch(event, query);
        } else {
            filterNodes(query);
        }
    }, [onSearch, filterNodes]);

    return [results, search];
}
