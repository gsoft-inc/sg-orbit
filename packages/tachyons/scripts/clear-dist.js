const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.rm("-f", `${DIST_PATH}/*`);

console.log(chalk.green("success"), " tachyons dist folder cleared.");