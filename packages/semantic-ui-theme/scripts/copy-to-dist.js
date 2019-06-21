const chalk = require("chalk");
const shell = require("shelljs");

const SRC_PATH = "semantic/dist";
const DIST_PATH = "dist";

shell.rm("-rf", DIST_PATH);

// Make sure the consumers can easily require a single components
shell.mkdir(DIST_PATH);
shell.cp("-Rf", `${SRC_PATH}/components/*.css`, DIST_PATH);
shell.cp("-Rf", `${SRC_PATH}/themes`, DIST_PATH);
shell.cp("-f", `${SRC_PATH}/semantic*.css`, DIST_PATH);
shell.cp("-f", "package.json", "README.md", DIST_PATH);

// Ensure that the "main" file configured in package.json works.
shell.mkdir("-p", `${DIST_PATH}/${SRC_PATH}`);
shell.cp("-f", `${SRC_PATH}/semantic*.css`, `${DIST_PATH}/${SRC_PATH}`);
shell.cp("-Rf", `${SRC_PATH}/themes`, `${DIST_PATH}/${SRC_PATH}`);

console.log(chalk.green("success"), " semantic dist output copied to dist folder.");

