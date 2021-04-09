import { Snippet } from "@stories/components";
import { string } from "prop-types";
import { useThemedSnippet } from "./useThemedSnippet";

const propTypes = {
    apricot: string.isRequired,
    desktop: string.isRequired,
    language: string
};

const defaultProps = {
    language: "javascript"
};

export function ThemedSnippet({ apricot, desktop, language, ...rest }) {
    const code = useThemedSnippet({
        apricot,
        desktop
    });

    return (
        <Snippet
            {...rest}
            language={language}
            code={code}
        />
    );
}

ThemedSnippet.propTypes = propTypes;
ThemedSnippet.defaultProps = defaultProps;
