const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.cp("-f", "package.json", "README.md", DIST_PATH);

console.log(chalk.green("success"), " tachyons copied to dist folder.");

