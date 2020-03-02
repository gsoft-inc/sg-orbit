const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";
const TEMP_PATH = "temp";

shell.rm("-rf", `${DIST_PATH}/*`);
console.log(chalk.green("success"), " tachyons dist folders cleared.");

shell.rm("-rf", `${TEMP_PATH}/*`);
console.log(chalk.green("success"), " tachyons temp folders cleared.");

shell.rm("-rf", `docs/${DIST_PATH}/*`);
console.log(chalk.green("success"), " tachyons docs/dist folder cleared.");

shell.rm("-rf", `docs/${TEMP_PATH}/*`);
console.log(chalk.green("success"), " tachyons docs/temps folder cleared.");
