import { InlineGithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    relativeFilePath: string
};

export function FileLink({ relativeFilePath }) {
    return (
        <>
            <span className="fw5 f6">Defined in</span> <InlineGithubLink path={`/packages/foundation/src/atoms${relativeFilePath}`}>{`src/atoms${relativeFilePath}`}</InlineGithubLink>
        </>
    );
}

FileLink.propTypes = propTypes;
