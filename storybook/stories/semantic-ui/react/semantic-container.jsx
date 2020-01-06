import { SemanticLink } from "@docs-blocks";
import { string } from "prop-types";

const propTypes = {
    documentationPath: string.isRequired
};

export function SemanticContainer({ documentationPath }) {
    return (
        <>
            <SemanticLink path={documentationPath} />
        </>
    );
}

SemanticContainer.propTypes = propTypes;
