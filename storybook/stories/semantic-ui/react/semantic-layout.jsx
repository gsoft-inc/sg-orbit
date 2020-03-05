import { BrandPicker, CornerSemanticLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    documentationPath: string.isRequired
};

export function SemanticLayout({ documentationPath, children }) {
    return (
        <>
            <BrandPicker />
            <CornerSemanticLink path={documentationPath} />
            {children}
        </>
    );
}

SemanticLayout.propTypes = propTypes;
