import { NodeType, useCollection } from "./useCollection";
import { getRawSlots } from "../../shared";
import { isNil } from "lodash";
import { useCallback, useState } from "react";

export function getItemText(item) {
    const { text, stringValue } = getRawSlots(item?.content, ["text"]);

    return !isNil(text)
        ? text.props?.children ?? ""
        : stringValue ?? "";
}

function isQueryMatchItem(query, item) {
    const itemText = getItemText(item);

    return itemText.toLowerCase().startsWith(query);
}

function useNodeSearch(nodes) {
    const [results, setResults] = useState([]);

    const search = useCallback(query => {
        const cache = {};

        query = query.toLowerCase();

        if (!isNil(cache[query])) {
            setResults(cache[query]);
        } else {
            const reducedNodes = nodes.reduce((acc, node) => {
                if (node.type === NodeType.section) {
                    const items = node.items.reduce((sectionItems, item) => {
                        if (isQueryMatchItem(query, item)) {
                            sectionItems.push(item);
                        }

                        return sectionItems;
                    }, []);

                    if (items.length > 0) {
                        // eslint-disable-next-line no-unused-vars
                        const { items: _, ...sectionProps } = node;

                        acc.push({
                            ...sectionProps,
                            items
                        });
                    }
                } else if (node.type === NodeType.item) {
                    if (isQueryMatchItem(query, node)) {
                        acc.push(node);
                    }
                } else {
                    acc.push(node);
                }

                return acc;
            }, []);

            setResults(reducedNodes);
        }
    }, [nodes, setResults]);

    return [results, search];
}

export function useCollectionSearch(children, { items, onSearch }) {
    const nodes = useCollection(children, { items });

    const [searchResults, searchNodes] = useNodeSearch(nodes);

    // If a search function is provided, offload the search to the caller and use the nodes computed from the items
    // otherwise use the node search results.
    const results = !isNil(onSearch) ? nodes : searchResults;

    const search = useCallback((event, query) => {
        if (!isNil(onSearch)) {
            onSearch(event, query);
        } else {
            searchNodes(query);
        }
    }, [onSearch, searchNodes]);

    return [results, search];
}
