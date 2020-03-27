import { BrandPicker, CornerGithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string.isRequired
};

export function MaterialsLayout({ sourcePath, children }) {
    return (
        <>
            <BrandPicker />
            <CornerGithubLink path={sourcePath} />
            {children}
        </>
    );
}

MaterialsLayout.propTypes = propTypes;
