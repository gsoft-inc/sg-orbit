const chalk = require("chalk");
const es = require("../../../scripts/ensure-success");
const { loadIcons } = require("../../icons/scripts/load-icons");
const { optimizeIcons } = require("../../icons/scripts/optimize-icons");
const { generateIconComponents } = require("./generate-react-components");
const { generateIndexFile } = require("./generate-index-file");
const shell = require("shelljs");

const SRC_PATH = "../icons/src";
const GENERATED_ICON_PATH = "./src/icons/src/generated-icons";

console.log("Generating icon components...");

function cleanDir(dir) {
    if (shell.test("-d", dir)) {
        es(shell.rm("-rf", `${dir}/*`));
    }
}

loadIcons(SRC_PATH)
    .then(icons => optimizeIcons(icons))
    .then(icons => {
        cleanDir(GENERATED_ICON_PATH);

        return icons;
    })
    .then(icons => {
        generateIconComponents(icons, GENERATED_ICON_PATH);

        return icons;
    })
    .then(icons => generateIndexFile(icons, GENERATED_ICON_PATH))
    .catch(error => console.error(error))
    .then(() => console.log(chalk.green("Icon components generated!")));

