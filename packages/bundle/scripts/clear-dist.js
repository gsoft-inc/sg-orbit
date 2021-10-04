const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.rm("-rf", `${DIST_PATH}/*`);

console.log(chalk.green("success"), " bundler dist folders cleared.");
