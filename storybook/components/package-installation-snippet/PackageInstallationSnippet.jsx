import { Source } from "@storybook/components";
import { isNil } from "lodash";
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
        <Source
            {...rest}
            language="bash"
            dark
            format={false}
            code={`npm install ${dependencies}`}
        />
    );
}

PackageInstallationSnippet.propTypes = propTypes;
