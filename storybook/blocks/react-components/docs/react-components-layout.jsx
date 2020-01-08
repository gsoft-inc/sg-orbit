import { BrandPicker, GithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string.isRequired
};

export function ReactComponentsLayout({ sourcePath, children }) {
    return (
        <>
            <BrandPicker />
            <GithubLink path={sourcePath} />
            {children}
        </>
    );
}

ReactComponentsLayout.propTypes = propTypes;
