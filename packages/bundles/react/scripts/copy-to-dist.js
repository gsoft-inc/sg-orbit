const chalk = require("chalk");
const shell = require("shelljs");

const SRC_PATH = "src";
const DIST_PATH = "dist";

shell.rm("-rf", DIST_PATH);

shell.cp("-Rf", SRC_PATH, DIST_PATH);
shell.cp("-f", "package.json", "README.md", DIST_PATH);

console.log(chalk.green("success"), " bundles/react src copied to dist folder.");

