const chalk = require("chalk");
const { clearDir } = require("../../../scripts/helper");
const { optimize } = require("../../icons/scripts/optimize");
const { generateSvgComponents, generateIndexFile } = require("./generate-react-components");

const SRC_PATH = "../icons/src";
const GENERATED_ICON_PATH = "./src/icons/src/generated-icons";

console.log("\nBuild started...");

optimize(SRC_PATH)
    .then(icons => {
        clearDir(GENERATED_ICON_PATH);

        generateSvgComponents(icons, GENERATED_ICON_PATH);
        generateIndexFile(icons, GENERATED_ICON_PATH);
    })
    .catch(error => console.error(error))
    .then(() => console.log(chalk.green("\n🚀 Icon components generated!\n")));

