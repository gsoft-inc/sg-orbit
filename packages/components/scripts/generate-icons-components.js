const chalk = require("chalk");
const es = require("../../../scripts/ensure-success");
const { loadOptimizedIcons } = require("../../icons/scripts/load-optimized-icons");
const { generateIconComponents, generateIndexFile } = require("./generate-react-components");
const shell = require("shelljs");

const SRC_PATH = "../icons/src";
const GENERATED_ICON_PATH = "./src/icons/src/generated-icons";

console.log("Generating icon components...");

loadOptimizedIcons(SRC_PATH)
    .then(icons => {
        if (shell.test("-d", GENERATED_ICON_PATH)) {
            es(shell.rm("-rf", `${GENERATED_ICON_PATH}/*`));
        }

        generateIconComponents(icons, GENERATED_ICON_PATH);
        generateIndexFile(icons, GENERATED_ICON_PATH);
    })
    .catch(error => console.error(error))
    .then(() => console.log(chalk.green("Icon components generated!")));

