import { Snippet, SnippetProps } from "@stories/components";
import { useThemedSnippet } from "./useThemedSnippet";

interface ThemedSnippetProps extends SnippetProps {
    sharegate: string;
}

export function ThemedSnippet({ sharegate, language = "javascript", ...rest }: ThemedSnippetProps) {
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

