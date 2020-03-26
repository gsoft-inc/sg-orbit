import { Source } from "@storybook/components";
import { isNil } from "lodash";
import { useState } from "react";

export function ReactComponentsDependencies() {
    const [dependencies, setDependencies] = useState(null);

    if (isNil(dependencies)) {
        import(/* webpackMode: "eager" */ "@root/packages/react-components/package.json")
            .then(module => {
                const json = module.default;
                const peerDependencies = Object.keys(json.peerDependencies).filter(x => x !== "react" && x !== "react-dom");

                setDependencies([json.name, ...peerDependencies].join(" "));
            });

        return null;
    }

    return <Source language="bash" dark format={false} code={`npm install ${dependencies}`} />;
}
