import { Snippet, SnippetProps } from "@stories/components";
import { isNil } from "@components/shared";
import { useState } from "react";


interface PackageInstallationSnippetProps extends SnippetProps {
    packageName: string;
    workspaceFolder?: "packages" | "tooling";
}

export function PackageInstallationSnippet({ packageName, workspaceFolder = "packages", ...rest }: PackageInstallationSnippetProps) {
    const [dependencies, setDependencies] = useState<string>();

    if (isNil(dependencies)) {
        import(/* webpackMode: "eager" */ `@root/${workspaceFolder}/${packageName}/package.json`)
            .then(module => {
                const json = module.default;
                const peerDependencies = !isNil(json.peerDependencies) ? Object.keys(json.peerDependencies).filter(x => x !== "react" && x !== "react-dom") : [];

                setDependencies([json.name, ...peerDependencies].join(" "));
            });

        return null;
    }

    return (
        <Snippet
            {...rest}
            language="bash"
            code={`npm install ${dependencies}`}
        />
    );
}
