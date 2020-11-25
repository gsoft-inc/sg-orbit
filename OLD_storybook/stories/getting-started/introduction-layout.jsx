import { BrandPicker, CornerGithubLink } from "@stories/components";
import { string } from "prop-types";

const propTypes = {
    sourcePath: string.isRequired
};

export function IntroductionLayout({ sourcePath, children }) {
    return (
        <>
            <BrandPicker />
            <CornerGithubLink path={sourcePath} />
            {children}
        </>
    );
}

IntroductionLayout.propTypes = propTypes;
