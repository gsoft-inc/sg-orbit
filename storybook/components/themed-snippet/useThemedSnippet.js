import { isNil, isString } from "lodash";
import { useMemo } from "react";

export function useThemedSnippet(snippets) {
    return useMemo(() => {
        if (isNil(snippets) || isString(snippets)) {
            return snippets;
        }

        return snippets["apricot"];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(snippets)]);
}
