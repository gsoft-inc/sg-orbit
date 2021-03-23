const chalk = require("chalk");
const shell = require("shelljs");

const SRC_PATH = "src";
const DIST_PATH = "dist";

shell.rm("-rf", DIST_PATH);

shell.cp("-Rf", SRC_PATH, DIST_PATH);
shell.cp("-f", "package.json", "README.md", DIST_PATH);

// Ensure that the "main" file configured in package.json is available.
shell.mkdir(`${DIST_PATH}`);
shell.cp("-Rf", [`${DIST_PATH}`]);

console.log(chalk.green("success"), " foundation src copied to dist folder.");
