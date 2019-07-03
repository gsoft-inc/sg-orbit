const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.cp("-f", "package.json", "README.md", DIST_PATH);

// Ensure that the "main" file configured in package.json is available.
shell.mkdir("-f", `${DIST_PATH}/${DIST_PATH}`);
shell.cp("-Rf", `${DIST_PATH}/tachyons.css`, `${DIST_PATH}/${DIST_PATH}`);

console.log(chalk.green("success"), " tachyons copied to dist folder.");

