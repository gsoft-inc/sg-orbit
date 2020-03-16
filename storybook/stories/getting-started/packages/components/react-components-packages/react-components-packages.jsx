import { ExternalLink } from "@blocks";
import { Fragment, useState } from "react";
import { PackagesTable } from "../packages-table";
import { isNil } from "lodash";

export function ReactComponentsPackages() {
    const [componentPackages, setComponentPackages] = useState(null);

    if (isNil(componentPackages)) {
        // TODO: Is it do-able with webpack "import" ?
        const context = require.context("@root/packages/react-components/components", true, /\/package.json/, "eager");

        const discoveryPromises = context.keys().map(filePath => {
            return new Promise(resolve => {
                context(filePath).then(x => {
                    resolve({
                        name: filePath.replace("./", "").replace("/package.json", ""),
                        manifest: x
                    });
                });
            });
        });

        Promise.all(discoveryPromises).then(x => {
            setComponentPackages(x);
        });

        return null;
    }

    const componentsRows = componentPackages.map(x => (
        { name: x.manifest.name, description: x.manifest.description, relativePath: `packages/react-components/components/${x.name}` }
    ));

    return (
        <PackagesTable
            packages={[
                { name: "@orbit-ui/semantic-ui-theme", description: <Fragment>Orbit UI custom theme for <ExternalLink href="https://semantic-ui.com">Semantic UI</ExternalLink>. The theme is based on the variables of @orbit-ui/foundation.</Fragment>, relativePath: "packages/semantic-ui-theme" },
                { name: "@orbit-ui/react", description: "A single package bundle to use Orbit UI in a React app.", relativePath: "packages/bundles/react" },
                { name: "@orbit-ui/react-components", description: "A bundle containing all Orbit UI custom React components.", relativePath: "packages/react-components" },
                ...componentsRows
            ]}
        />
    );
}
