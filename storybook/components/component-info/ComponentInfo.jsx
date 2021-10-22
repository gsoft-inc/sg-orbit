import "./ComponentInfo.css";

import { Div } from "@components/html";
import { ExternalLink, GithubLink, Link, useThemedSnippet } from "@stories/components";
import { arrayOf, bool, oneOfType, shape, string } from "prop-types";
import { cssModule, mergeClasses } from "@components/shared";

const propTypes = {
    usage: oneOfType([
        string,
        shape({
            apricot: string.isRequired,
            desktop: string.isRequired
        })
    ]),
    slots: arrayOf(string),
    inheits: arrayOf(string),
    ariaPath: string,
    githubPath: string,
    compact: bool
};

const ExtendLinks = {
    "styled-component": <Link href="?path=/docs/styling--page">StyledComponent</Link>,
    "a": <Link href="?path=/docs/html-anchor--example">A</Link>,
    "button": <Link href="?path=/docs/html-button--example">Button</Link>,
    "div": <Link href="?path=/docs/html-div--example">Div</Link>,
    "h1": <Link href="?path=/docs/html-h1--example">H1</Link>,
    "h2": <Link href="?path=/docs/html-h2--example">H2</Link>,
    "h3": <Link href="?path=/docs/html-h3--example">H3</Link>,
    "h4": <Link href="?path=/docs/html-h4--example">H4</Link>,
    "h5": <Link href="?path=/docs/html-h5--example">H5</Link>,
    "h6": <Link href="?path=/docs/html-h6--example">H6</Link>,
    "img": <Link href="?path=/docs/html-img--example">Img</Link>,
    "input": <Link href="?path=/docs/html-input--example">Input</Link>,
    "label": <Link href="?path=/docs/html-label--example">Label</Link>,
    "li": <Link href="?path=/docs/html-li--example">LI</Link>,
    "p": <Link href="?path=/docs/html-p--example">P</Link>,
    "section": <Link href="?path=/docs/html-section--example">Section</Link>,
    "span": <Link href="?path=/docs/html-span--example">Span</Link>,
    "svg": <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/SVGElement">Svg</ExternalLink>,
    "textarea": <Link href="?path=/docs/html-textarea--example">Textarea</Link>,
    "ul": <Link href="?path=/docs/html-ul--example">UL</Link>
};

export function ComponentInfo({
    usage,
    slots,
    inherits,
    ariaPath,
    githubPath,
    compact,
    className,
    ...rest
}) {
    usage = useThemedSnippet(usage);

    return (
        <dl
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-sb-component-info",
                    compact && "compact"
                ),
                className
            )}
        >
            {usage && (
                <Div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">usage</dt>
                    <dd className="o-ui-sb-component-info-value"><code>{usage}</code></dd>
                </Div>
            )}
            {slots && (
                <Div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">slots</dt>
                    <dd className="o-ui-sb-component-info-value"><code>{slots.map(x => `"${x}"`).join(", ")}</code></dd>
                </Div>
            )}
            {ariaPath && (
                <Div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">wai-aria</dt>
                    <dd className="o-ui-sb-component-info-value">
                        <ExternalLink href={`https://www.w3.org/TR/wai-aria-practices/${ariaPath}`}>{`https://www.w3.org/TR/wai-aria-practices/${ariaPath}`}</ExternalLink>
                    </dd>
                </Div>
            )}
            {githubPath && (
                <Div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">sources</dt>
                    <dd className="o-ui-sb-component-info-value">
                        <GithubLink path={githubPath}>Github</GithubLink>
                    </dd>
                </Div>
            )}
            {inherits && (
                <Div className="o-ui-sb-component-info-item">
                    <dt className="o-ui-sb-component-info-title">extends</dt>
                    <dd className="o-ui-sb-component-info-value">
                        <ul>
                            {/* eslint-disable-next-line react/no-array-index-key */}
                            {inherits.map((x, index) => <li key={index}>{ExtendLinks[x]}</li>)}
                        </ul>
                    </dd>
                </Div>
            )}
        </dl>
    );
}

ComponentInfo.propTypes = propTypes;
