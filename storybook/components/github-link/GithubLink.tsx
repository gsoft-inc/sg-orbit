import { ExternalLink, ExternalLinkProps } from "@stories/components";
import { Flex } from "@components/layout";
import { Img } from "@components/html";
import { getGithubUrl } from "./getGithubUrl";
import GithubLogo from "./assets/logo-github-32.png";

interface GithubLinkProps extends Omit<ExternalLinkProps, "href"> {
    path: string;
    logo?: boolean;
}


export function GithubLink({ path, logo = false, children, ...rest }: GithubLinkProps) {
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
