import { isNil } from "lodash";
import { useLayoutEffect, useState } from "react";

export function useHasChildren(rootRef, selectors) {
    const [queryResults, setResults] = useState({});

    // No deps since it must be evaluated on every render to handled dynamically rendered elements.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        const element = rootRef.current;

        if (!isNil(element)) {
            let isDirty = false;

            const newResults = Object.keys(selectors).reduce((results, x) => {
                const result = !isNil(element.querySelector(`:scope > ${selectors[x]}`));

                isDirty = isDirty || queryResults[x] !== result;
                results[x] = result;

                return results;
            }, {});

            if (isDirty) {
                setResults(newResults);
            }
        }
    });

    return queryResults;
}
