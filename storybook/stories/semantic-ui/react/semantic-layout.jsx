import { BrandPicker, SemanticLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    documentationPath: string.isRequired
};

export function SemanticLayout({ documentationPath, children }) {
    return (
        <>
            <BrandPicker />
            <SemanticLink path={documentationPath} />
            {children}
        </>
    );
}

SemanticLayout.propTypes = propTypes;
