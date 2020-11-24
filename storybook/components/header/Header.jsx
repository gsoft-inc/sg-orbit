import "./Header.css";

import { ExternalLink, GithubLink } from "@stories/components";
import { mergeClasses } from "@react-components/shared";
import { string } from "prop-types";

const propTypes = {
    usage: string.isRequired,
    aria: string,
    github: string
};

export function Header({
    usage,
    aria,
    github,
    className,
    ...rest
}) {
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
            {aria && (
                <div>
                    <dt className="o-ui-sb-header-title">aria</dt>
                    <dd className="o-ui-sb-header-value">
                        <ExternalLink href={`https://www.w3.org/TR/wai-aria-practices/${aria}`}>{`https://www.w3.org/TR/wai-aria-practices/${aria}`}</ExternalLink>
                    </dd>
                </div>
            )}
            {github && (
                <div>
                    <dt className="o-ui-sb-header-title">sources</dt>
                    <dd className="o-ui-sb-header-value">
                        <GithubLink path={github}>Github</GithubLink>
                    </dd>
                </div>
            )}
        </dl>
    );
}

Header.propTypes = propTypes;
