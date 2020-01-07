import { GithubLink } from "@blocks";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string.isRequired
};

export function IntroductionContainer({ sourcePath, children }) {
    return (
        <>
            <GithubLink path={sourcePath} />
            {children}
        </>
    );
}

IntroductionContainer.propTypes = propTypes;
