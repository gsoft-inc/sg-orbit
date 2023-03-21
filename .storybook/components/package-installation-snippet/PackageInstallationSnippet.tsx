import { Snippet, SnippetProps } from "@stories/components";
import { useState } from "react";


interface PackageInstallationSnippetProps extends SnippetProps {
    packageName: string;
}

export function PackageInstallationSnippet({ packageName, ...rest }: PackageInstallationSnippetProps) {
    const [dependencies] = useState<string>();

    return (
        <Snippet
            {...rest}
            language="bash"
            code={`npm install ${dependencies}`}
        />
    );
}
