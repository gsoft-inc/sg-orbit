import { Snippet } from "@stories/components";
import { string } from "prop-types";
import { useThemedSnippet } from "./useThemedSnippet";

const propTypes = {
    apricot: string.isRequired,
    overcast: string.isRequired,
    desktop: string.isRequired,
    language: string
};

const defaultProps = {
    language: "javascript"
};

export function ThemedSnippet({ apricot, overcast, desktop, language, ...rest }) {
    const code = useThemedSnippet({
        apricot,
        overcast,
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
