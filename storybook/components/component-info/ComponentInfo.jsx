import "./ComponentInfo.css";

import { Div } from "@react-components/html";
import { ExternalLink, GithubLink, useThemedSnippet } from "@stories/components";
import { arrayOf, bool, oneOfType, shape, string } from "prop-types";
import { cssModule, mergeClasses } from "@react-components/shared";

const propTypes = {
    usage: oneOfType([
        string,
        shape({
            apricot: string.isRequired,
            desktop: string.isRequired
        })
    ]),
    slots: arrayOf(string),
    ariaPath: string,
    githubPath: string,
    compact: bool
};

export function ComponentInfo({
    usage,
    slots,
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
        </dl>
    );
}

ComponentInfo.propTypes = propTypes;
