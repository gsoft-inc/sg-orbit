import { ExternalLink, ExternalLinkProps } from "@stories/components";
import { getGithubUrl } from "./getGithubUrl";
import GithubLogo from "./assets/logo-github-32.png";

interface GithubLinkProps extends Omit<ExternalLinkProps, "href"> {
    path: string;
    logo?: boolean;
}


export function GithubLink({ path, logo = false, children, ...rest }: GithubLinkProps) {
    if (logo) {
        return (
            <div>
                <img src={GithubLogo} alt="Github" />
                <ExternalLink href={getGithubUrl(path)} {...rest}>{children}</ExternalLink>
            </div>
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
