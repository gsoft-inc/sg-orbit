import "./Snippet.css";

import Highlight, { defaultProps } from "prism-react-renderer";
import { isNil, mergeClasses } from "@components/shared";

import { Div } from "@components/html";
import { string } from "prop-types";
import theme from "prism-react-renderer/themes/dracula";
import { useFormattedCode } from "./useFormattedCode";
import { useState } from "react";

const propTypes = {
    code: string,
    filePath: string,
    language: string
};

export const CodeTheme = theme;

function CodeBlock({ code, language, className: wrapperClassName, ...rest }) {
    const formattedCode = useFormattedCode(code, language);

    return (
        <Div
            className={mergeClasses(
                "o-ui-sb-snippet",
                "docblock-source",
                wrapperClassName
            )}
        >
            <Highlight
                {...rest}
                {...defaultProps}
                code={formattedCode}
                language={language}
                theme={CodeTheme}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <Div {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </Div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </Div>
    );
}

function FileSnippet({ filePath, language, ...rest }) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        import(/* webpackMode: "eager" */ `@root/packages/components/src${filePath}.sample.jsx?raw`)
            .then(module => {
                setCode(module.default);
            });

        return null;
    }

    return <CodeBlock code={code} language={language} {...rest} />;
}

export function Snippet({ code, filePath, language = "jsx", ...rest }) {
    if (!isNil(filePath)) {
        return <FileSnippet filePath={filePath} language={language} {...rest} />;
    }

    return <CodeBlock code={code} language={language} {...rest} />;
}

Snippet.propTypes = propTypes;

