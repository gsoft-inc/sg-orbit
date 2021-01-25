import "./Snippet.css";

import { isNil } from "lodash";
import { string } from "prop-types";
import { useFormattedCode } from "./useFormattedCode";
import { useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

const propTypes = {
    code: string,
    filePath: string,
    language: string
};

export const CodeTheme = theme;

function CodeBlock({ code, language }) {
    const formattedCode = useFormattedCode(code, language);

    return (
        <div className="o-ui-sb-snippet docblock-source">
            <Highlight
                {...defaultProps}
                code={formattedCode}
                language={language}
                theme={CodeTheme}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}

function FileSnippet({ filePath, language }) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setCode(module.default);
            });

        return null;
    }

    return <CodeBlock code={code} language={language} />;
}

export function Snippet({ code, filePath, language = "jsx" }) {
    if (!isNil(filePath)) {
        return <FileSnippet filePath={filePath} language={language} />;
    }

    return <CodeBlock code={code} language={language} />;
}

Snippet.propTypes = propTypes;


