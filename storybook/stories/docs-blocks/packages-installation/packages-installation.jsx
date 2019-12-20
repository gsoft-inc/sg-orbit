import { Source } from "@storybook/components";
import { isNil } from "lodash";
import { useState } from "react";

export function PackagesInstallation({ packageName }) {
    const [dependencies, setDependencies] = useState(null);

    import(/* webpackMode: "eager" */ `../../../../packages/react-components/components/${packageName}/package.json`)
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
