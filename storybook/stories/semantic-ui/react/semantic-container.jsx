import { SemanticLink } from "@docs-blocks";
import { string } from "prop-types";

const propTypes = {
    semanticPath: string.isRequired
};

export function SemanticContainer({ semanticPath }) {
    return (
        <>
            <SemanticLink docPath={semanticPath} />
        </>
    );
}

SemanticContainer.propTypes = propTypes;
