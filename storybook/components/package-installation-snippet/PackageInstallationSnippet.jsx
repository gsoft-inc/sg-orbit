import { Snippet } from "@stories/components";
import { isNil } from "@react-components/shared";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    packageName: string.isRequired
};

export function PackageInstallationSnippet({ packageName, ...rest }) {
    const [dependencies, setDependencies] = useState();

    if (isNil(dependencies)) {
        import(/* webpackMode: "eager" */ `@root/packages/${packageName}/package.json`)
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

PackageInstallationSnippet.propTypes = propTypes;
