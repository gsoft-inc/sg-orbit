import { DocsContext } from "@storybook/addon-docs";
import { useContext, useMemo } from "react";
export function isNull(value) {
    return value == null;
}
export function isUndefined(value) {
    return typeof value === "undefined" || value === undefined;
}
export function isDefined(value) {
    return typeof value !== "undefined" && value !== undefined;
}
export function isNil(value) {
    return isNull(value) || isUndefined(value);
}
export function isString(value) {
    return Object.prototype.toString.call(value) === "[object String]";
}
export function useThemedSnippet(snippets: string | Record<string, string>) {
    const { globals } = useContext(DocsContext);

    return useMemo(() => {
        if (isNil(snippets) || isString(snippets)) {
            return snippets;
        }

        return snippets[globals.theme];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(snippets), globals.theme]);
}
