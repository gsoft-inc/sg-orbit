import "./Snippet.css";

import { string } from "prop-types";
import { useFormattedCode } from "./useFormattedCode";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

const propTypes = {
    code: string,
    language: string
};

export const CodeTheme = theme;

export function Snippet({ code, language = "jsx" }) {
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

Snippet.propTypes = propTypes;


