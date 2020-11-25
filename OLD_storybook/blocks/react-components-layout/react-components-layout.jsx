import { BrandPicker, CornerGithubLink, CornerSemanticLink } from "@stories/components";
import { isNil } from "lodash";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string,
    semanticPath: string
};

export function ReactComponentsLayout({ sourcePath, semanticPath, children }) {
    return (
        <>
            <BrandPicker />
            {!isNil(sourcePath) && <CornerGithubLink path={sourcePath} />}
            {!isNil(semanticPath) && <CornerSemanticLink path={semanticPath} />}
            {children}
        </>
    );
}

ReactComponentsLayout.propTypes = propTypes;
