import "./ComponentInfo.css";

import { ComponentProps } from "react";

const ExtendLinks = {
    "styled-component": <a href="?path=/docs/style-props--page#properties">StyleProps</a>,
    "a": <a href="?path=/docs/html-anchor--example">A</a>,
    "button": <a href="?path=/docs/html-button--example">Button</a>,
    "div": <a href="?path=/docs/html-div--example">Div</a>,
    "h1": <a href="?path=/docs/html-h1--example">H1</a>,
    "h2": <a href="?path=/docs/html-h2--example">H2</a>,
    "h3": <a href="?path=/docs/html-h3--example">H3</a>,
    "h4": <a href="?path=/docs/html-h4--example">H4</a>,
    "h5": <a href="?path=/docs/html-h5--example">H5</a>,
    "h6": <a href="?path=/docs/html-h6--example">H6</a>,
    "img": <a href="?path=/docs/html-img--example">Img</a>,
    "input": <a href="?path=/docs/html-input--example">Input</a>,
    "label": <a href="?path=/docs/html-label--example">Label</a>,
    "li": <a href="?path=/docs/html-li--example">LI</a>,
    "p": <a href="?path=/docs/html-p--example">P</a>,
    "section": <a href="?path=/docs/html-section--example">Section</a>,
    "span": <a href="?path=/docs/html-span--example">Span</a>,
    "svg": <a href="https://developer.mozilla.org/en-US/docs/Web/API/SVGElement">Svg</a>,
    "textarea": <a href="?path=/docs/html-textarea--example">Textarea</a>,
    "ul": <a href="?path=/docs/html-ul--example">UL</a>
};


export interface ComponentInfoProps extends ComponentProps<"dl">{
    usage: string | {
        sharegate: string;
    };
    slots?: string[];
    inherits?: string[];
    ariaPath?: string;
    githubPath?: string;
    compact?: boolean;
}

export function ComponentInfo({
    usage: usageProp,
    slots,
    inherits,
    ariaPath,
    githubPath,
    compact,
    className,
    ...rest
}: ComponentInfoProps) {
    const usage = typeof usageProp === "string" ? usageProp : usageProp.sharegate;
    return (
        <dl
            {...rest}
            className={"o-ui-sb-component-info" + (compact ? " o-ui-sb-component-info-compact": "") + " " + className}
        >
            {usage && (
                <div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">usage</dt>
                    <dd className="o-ui-sb-component-info-value"><code>{usage}</code></dd>
                </div>
            )}
            {slots && (
                <div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">slots</dt>
                    <dd className="o-ui-sb-component-info-value"><code>{slots.map(x => `"${x}"`).join(", ")}</code></dd>
                </div>
            )}
            {ariaPath && (
                <div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">wai-aria</dt>
                    <dd className="o-ui-sb-component-info-value">
                        <a href={`https://www.w3.org/WAI/ARIA/apg/patterns/${ariaPath}`}>{`https://www.w3.org/WAI/ARIA/apg/patterns/${ariaPath}`}</a>
                    </dd>
                </div>
            )}
            {githubPath && (
                <div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">sources</dt>
                    <dd className="o-ui-sb-component-info-value">
                        <a href={githubPath}>Github</a>
                    </dd>
                </div>
            )}
            {inherits && (
                <div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">extends</dt>
                    <dd className="o-ui-sb-component-info-value">
                        <ul>
                            {/* eslint-disable-next-line react/no-array-index-key */}
                            {inherits.map((x, index) => <li key={index}>{ExtendLinks[x]}</li>)}
                        </ul>
                    </dd>
                </div>
            )}
        </dl>
    );
}
