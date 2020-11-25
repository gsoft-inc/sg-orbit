import { ExternalLink } from "@stories/components";
import { getSemanticUrl } from "./get-semantic-link";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

export function InlineSemanticLink({ path, children, ...rest }) {
    return <ExternalLink href={getSemanticUrl(path)} {...rest}>{children}</ExternalLink>;
}

InlineSemanticLink.propTypes = propTypes;
