import { GithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string.isRequired
};

export function MaterialsContainer({ sourcePath, children }) {
    return (
        <>
            <GithubLink path={sourcePath} />
            {children}
        </>
    );
}

MaterialsContainer.propTypes = propTypes;
