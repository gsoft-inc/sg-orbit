import { GithubLink } from "@stories/components";
import { string } from "prop-types";

const propTypes = {
    relativeFilePath: string
};

export function FileLink({ relativeFilePath }) {
    return (
        <GithubLink path={`/packages/foundation/src/atoms${relativeFilePath}`} logo>{`atoms${relativeFilePath}`}</GithubLink>
    );
}

FileLink.propTypes = propTypes;
