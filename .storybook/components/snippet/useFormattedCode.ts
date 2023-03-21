import { useMemo } from "react";
import prettier from "prettier/standalone";
import prettierBabel from "prettier/parser-babel";
import prettierPostCss from "prettier/parser-postcss";
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
const PrettierParser = {
    "javascript": "babel",
    "jsx": "babel",
    "css": "css"
};

export function useFormattedCode(code: string, language: string) {
    return useMemo(() => {
        const parser = PrettierParser[language];

        if (!isNil(parser)) {
            return prettier
                .format(code, {
                    parser: parser,
                    plugins: [prettierBabel, prettierPostCss],
                    tabWidth: 4,
                    arrowParens: "avoid",
                    printWidth: 100,
                    trailingComma: "none"
                })
                .replace(">;", ">")
                .trim();
        }

        return code.trim();
    }, [code, language]);
}
