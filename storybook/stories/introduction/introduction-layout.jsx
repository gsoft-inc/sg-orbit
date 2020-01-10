import { GithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string.isRequired
};

export function IntroductionLayout({ sourcePath, children }) {
    return (
        <>
            <GithubLink path={sourcePath} />
            {children}
        </>
    );
}

IntroductionLayout.propTypes = propTypes;
