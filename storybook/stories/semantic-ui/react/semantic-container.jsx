import { SemanticLink, TopAnchor } from "@docs-blocks";
import { string } from "prop-types";

const propTypes = {
    semanticPath: string.isRequired
};

export function SemanticContainer({ semanticPath }) {
    return (
        <>
            <TopAnchor />
            <SemanticLink docPath={semanticPath} />
        </>
    );
}

SemanticContainer.propTypes = propTypes;
