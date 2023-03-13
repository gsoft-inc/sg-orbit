import "./Snippet.css";

import { Div } from "@components/html";
import { isNil, mergeClasses } from "@components/shared";
import { useFormattedCode } from "./useFormattedCode";
import { ComponentProps, useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

export const CodeTheme = theme;


interface CodeBlockProps extends Omit<ComponentProps<typeof Highlight>, "children" | "Prism">{
    className?: string;
}

function CodeBlock({ code, language, className: wrapperClassName, ...rest }: CodeBlockProps) {
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

interface FileSnippetProps extends Omit<CodeBlockProps, "code"> {
    filePath: string;
}

function FileSnippet({ filePath, language, ...rest }: FileSnippetProps) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/components/src${filePath}.sample.jsx`)
            .then(module => {
                setCode(module.default);
            });

        return null;
    }

    return <CodeBlock code={code} language={language} {...rest} />;
}

export interface SnippetProps extends CodeBlockProps {
    filePath?: string;
}

export function Snippet({ code, filePath, language = "jsx", ...rest }: SnippetProps) {
    if (!isNil(filePath)) {
        return <FileSnippet filePath={filePath} language={language} {...rest} />;
    }

    return <CodeBlock code={code} language={language} {...rest} />;
}

