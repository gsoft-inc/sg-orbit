// These hooks are a "temporary" solution until CSS Selector 4 (and :has with complex combinators) is available.

import { isNil } from "lodash";
import { useLayoutEffect, useState } from "react";

export function useHasChild(querySelector, rootRef) {
    const [result, setResult] = useState({});

    // No deps since it must be evaluated on every render to handled dynamically rendered elements.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        if (!isNil(rootRef.current)) {
            setResult(!isNil(rootRef.current.querySelector(`:scope > ${querySelector}`)));
        }
    });

    return result;
}

/**
 * @example
 * const { hasIcon } = useHasChildren({ hasIcon: ".o-ui-lozenge-icon" }, ref);
 */
export function useHasChildren(querySelectors, rootRef) {
    const [queryResults, setResults] = useState({});

    // No deps since it must be evaluated on every render to handled dynamically rendered elements.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        const element = rootRef.current;

        if (!isNil(element)) {
            let isDirty = false;

            const newResults = Object.keys(querySelectors).reduce((results, x) => {
                const result = !isNil(element.querySelector(`:scope > ${querySelectors[x]}`));

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
