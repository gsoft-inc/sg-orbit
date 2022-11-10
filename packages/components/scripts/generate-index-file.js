const fs = require("fs");
const camelCase = require("camelcase");
const { groupBy } = require("lodash");

const GENERATED_HEADER = `/*
* THIS FILE IS GENERATED. DO NOT EDIT IT.
* To re-generate the icons, run the yarn generate-icons-components command in the components project.
*/
`;

const indexFileTemplate = (iconNames, groupedIcons) => `${GENERATED_HEADER}
/* eslint-disable */
import { createOrbitIcon, createOrbitMultiVariantIcon } from "../createOrbitIcon";

${iconNames.map(icon => `import { ReactComponent as Inner${icon} } from "./${icon}";`).join("\n")}

${iconNames.map(icon => `export const ${icon} = createOrbitIcon(Inner${icon}, "${icon}");`).join("\n")}

${Object.entries(groupedIcons).map(([key, group]) => {
        const name = getComponentName(key);

        return `export const ${name} = createOrbitMultiVariantIcon(${group.map(icon => `Inner${getComponentName(icon.name, icon.size)}`).join(", ")}, "${name}");`;
    }).join("\n")}
/* eslint-enable */
`;

function getComponentName(fileName, size) {
    const name = fileName.replace(/\.svg$/, "");

    const options = { pascalCase: true };
    let formatedName = camelCase(name, options);

    formatedName = formatedName.replace(/^(Icon)/, "");
    if (size) {
        formatedName = formatedName.replace(new RegExp(`${size}$`, "g"), `Icon${size}`);
    } else {
        formatedName += "Icon";
    }

    return formatedName;
}

function generateIndexFile(icons, dir) {
    const iconNames = icons.map(x => getComponentName(x.name, x.size));
    const groupedIcons = groupBy(icons, "group");
    const content = indexFileTemplate(iconNames, groupedIcons);

    fs.writeFileSync(`${dir}/index.tsx`, content);
}

module.exports = {
    generateIndexFile
};
