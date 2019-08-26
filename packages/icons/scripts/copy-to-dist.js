const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.cp("-f", "package.json", "README.md", DIST_PATH);

// Ensure that the "main" file configured in package.json is available.
shell.mkdir(`${DIST_PATH}/${DIST_PATH}`);
shell.cp("-Rf", [`${DIST_PATH}/index.js`, `${DIST_PATH}/*.svg`], `${DIST_PATH}/${DIST_PATH}`);

console.log(chalk.green("success"), " icons copied to dist folder.");

