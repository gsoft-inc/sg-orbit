import { ExternalLink } from "@stories/components";
import { Flex } from "@react-components/layout";
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
                <Img src={GithubLogo} alt="Github" width={5} height={5} marginRight={2} />
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
