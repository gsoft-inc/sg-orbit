import { Source } from "@storybook/components";
import { isNil } from "lodash";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    componentFolder: string.isRequired
};

export function NpmPackages({ componentFolder }) {
    const [dependencies, setDependencies] = useState(null);

    import(/* webpackMode: "eager" */ `../../../../packages/react-components/components/${componentFolder}/package.json`)
        .then(module => {
            const json = module.default;
            const peerDependencies = Object.keys(json.peerDependencies).filter(x => x !== "react" && x !== "react-dom");

            setDependencies([json.name, ...peerDependencies].join(" "));
        });

    if (!isNil(dependencies)) {
        return <Source language="bash" format={false} code={`npm install ${dependencies}`} />;
    }

    return null;
}

NpmPackages.propTypes = propTypes;
