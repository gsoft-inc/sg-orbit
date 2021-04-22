import { DocsContext } from "@storybook/addon-docs/blocks";
import { isNil, isString } from "@react-components/shared";
import { useContext, useMemo } from "react";

export function useThemedSnippet(snippets) {
    const { globals } = useContext(DocsContext);

    return useMemo(() => {
        if (isNil(snippets) || isString(snippets)) {
            return snippets;
        }

        return snippets[globals.theme];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(snippets), globals.theme]);
}
