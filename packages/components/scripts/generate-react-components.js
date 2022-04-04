const fs = require("fs");
const config = require("../../icons/scripts/svgo-config");
const { transform } = require("@svgr/core");
const camelCase = require("camelcase");
const shell = require("shelljs");

const GENERATED_HEADER = `/*
* THIS FILE IS GENERATED. DO NOT EDIT IT.
* To re-generate the icons, run the yarn generate-icons-components command in the components project.
*/
`;

const iconTemplate = content => `${GENERATED_HEADER}
/* eslint-disable */
${content}
/* eslint-enable */
`;

function getComponentName(fileName, size) {
    const name = fileName.replace(/\.svg$/, "");

    const options = { pascalCase: true };
    let formatedName = camelCase(name, options);

    formatedName = formatedName.replace(/^(Icon)/, "");
    if (size){
        formatedName = formatedName.replace(new RegExp(`${size}$`, "g"), `Icon${size}`);
    } else {
        formatedName += "Icon";
    }

    return formatedName;
}

function generateIconComponents(icons, dir){
    if (!shell.test("-d", dir)) {
        shell.mkdir(dir);
    }

    icons.forEach(icon => {
        const name = getComponentName(icon.name, icon.size);

        generateIconComponent(name, icon, dir);
    });
}

function generateIconComponent(name, icon, path) {
    const { data } = icon;

    const code = transform.sync(data, {
        typescript: true,
        jsxRuntime: "automatic",
        exportType: "named",
        ref: true,
        svgoConfig: config
    }, {
        componentName: `Inner${name}`
    });

    fs.writeFileSync(`${path}/${name}.tsx`, iconTemplate(code));
}

module.exports = {
    generateIconComponents
};
