const chalk = require("chalk");
const shell = require("shelljs");

const SRC_PATH = "src";
const DIST_PATH = "dist";

shell.rm("-rf", DIST_PATH);
shell.cp("-Rf", SRC_PATH, DIST_PATH);

console.log(chalk.green("success"), " icons copied to dist folder.");

