import { Snippet } from "@stories/components";
import { string } from "prop-types";
import { useThemedSnippet } from "./useThemedSnippet";

const propTypes = {
    sharegate: string.isRequired,
    language: string
};

const defaultProps = {
    language: "javascript"
};

export function ThemedSnippet({ sharegate, language, ...rest }) {
    const code = useThemedSnippet({
        sharegate
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
