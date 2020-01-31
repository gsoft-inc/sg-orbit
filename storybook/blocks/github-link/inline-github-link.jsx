import { ExternalLink } from "@blocks";
import { getGithubUrl } from "./get-github-url";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

export function InlineGithubLink({ path, children }) {
    return <ExternalLink href={getGithubUrl(path)}>{children}</ExternalLink>;
}

InlineGithubLink.propTypes = propTypes;
