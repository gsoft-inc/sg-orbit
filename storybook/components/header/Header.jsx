import "./Header.css";

import { ExternalLink, GithubLink, useThemedSnippet } from "@stories/components";
import { mergeClasses } from "@react-components/shared";
import { oneOfType, shape, string } from "prop-types";

const propTypes = {
    usage: oneOfType([
        string,
        shape({
            apricot: string.isRequired,
            overcast: string.isRequired,
            desktop: string.isRequired
        })
    ]).isRequired,
    ariaPath: string,
    githubPath: string
};

export function Header({
    usage,
    ariaPath,
    githubPath,
    className,
    ...rest
}) {
    usage = useThemedSnippet(usage);

    return (
        <dl
            {...rest}
            className={mergeClasses(
                "o-ui-sb-header",
                className
            )}
        >
            <div>
                <dt className="o-ui-sb-header-title">usage</dt>
                <dd className="o-ui-sb-header-value"><code>{usage}</code></dd>
            </div>
            {ariaPath && (
                <div>
                    <dt className="o-ui-sb-header-title">wai-aria</dt>
                    <dd className="o-ui-sb-header-value">
                        <ExternalLink href={`https://www.w3.org/TR/wai-aria-practices/${ariaPath}`}>{`https://www.w3.org/TR/wai-aria-practices/${ariaPath}`}</ExternalLink>
                    </dd>
                </div>
            )}
            {githubPath && (
                <div>
                    <dt className="o-ui-sb-header-title">sources</dt>
                    <dd className="o-ui-sb-header-value">
                        <GithubLink path={githubPath}>Github</GithubLink>
                    </dd>
                </div>
            )}
        </dl>
    );
}

Header.propTypes = propTypes;
