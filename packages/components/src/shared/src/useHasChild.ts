// These hooks are a "temporary" solution until CSS Selector 4 (and :has with complex combinators) is available.

import { RefObject, useLayoutEffect, useState } from "react";
import { isNil } from "./assertions";

export function useHasChild(querySelector: string, rootRef: RefObject<HTMLElement>) {
    const [result, setResult] = useState(false);

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
export function useHasChildren(querySelectors: Record<string, string>, rootRef: RefObject<HTMLElement>) {
    const [queryResults, setResults] = useState<Record<string, boolean>>({});

    // No deps since it must be evaluated on every render to handled dynamically rendered elements.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        const element = rootRef.current;

        if (!isNil(element)) {
            let isDirty = false;

            const newResults = Object.keys(querySelectors).reduce((results: Record<string, boolean>, x) => {
                // const result = !isNil(element.querySelector(`:scope > ${querySelectors[x]}`));
                const result = !isNil(element.querySelector(querySelectors[x]));

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

