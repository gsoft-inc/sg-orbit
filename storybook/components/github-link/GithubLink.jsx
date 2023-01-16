import { ExternalLink } from "@stories/components";
import { Flex } from "@components/layout";
import { bool, string } from "prop-types";
import { getGithubUrl } from "./getGithubUrl";
import GithubLogo from "./assets/logo-github-32.png";

const propTypes = {
    path: string.isRequired,
    logo: bool
};

const defaultProps = {
    logo: false
};

export function GithubLink({ path, logo, children, ...rest }) {
    if (logo) {
        return (
            <Flex inline alignItems="center">
                <img src={GithubLogo} alt="Github" width={5} height={5} style={{ marginRight: "8px" }} />
                <ExternalLink href={getGithubUrl(path)} {...rest}>{children}</ExternalLink>
            </Flex>
        );
    }

    return (
        <ExternalLink
            {...rest}
            href={getGithubUrl(path)}
        >
            {children}
        </ExternalLink>
    );
}

GithubLink.propTypes = propTypes;
GithubLink.defaultProps = defaultProps;
