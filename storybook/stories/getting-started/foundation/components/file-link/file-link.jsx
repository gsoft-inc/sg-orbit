import { InlineGithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    relativeFilePath: string
};

export function FileLink({ relativeFilePath }) {
    return (
        <InlineGithubLink path={`/packages/foundation/src/atoms${relativeFilePath}`} logo>{`atoms${relativeFilePath}`}</InlineGithubLink>
    );
}

FileLink.propTypes = propTypes;
