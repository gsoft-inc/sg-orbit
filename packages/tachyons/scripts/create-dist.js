const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

if (!shell.test("-d", DIST_PATH)) {
    shell.mkdir(DIST_PATH);

    console.log(chalk.green("success"), " dist directory created.");
}

if (!shell.test("-d", `docs/${DIST_PATH}`)) {
    shell.mkdir(`docs/${DIST_PATH}`);

    console.log(chalk.green("success"), " docs/dist directory created.");
}
