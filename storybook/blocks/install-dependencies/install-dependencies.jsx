import { Source } from "@storybook/components";
import { isNil } from "lodash";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    packageName: string.isRequired
};

export function InstallDependencies({ packageName }) {
    const [dependencies, setDependencies] = useState(null);

    if (isNil(dependencies)) {
        import(/* webpackMode: "eager" */ `@root/packages/${packageName}/package.json`)
            .then(module => {
                const json = module.default;
                const peerDependencies = !isNil(json.peerDependencies) ? Object.keys(json.peerDependencies).filter(x => x !== "react" && x !== "react-dom") : [];

                setDependencies([json.name, ...peerDependencies].join(" "));
            });

        return null;
    }

    return <Source language="bash" dark format={false} code={`npm install ${dependencies}`} />;
}

InstallDependencies.propTypes = propTypes;
