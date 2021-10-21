const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.cp("-f", "src/index.css", DIST_PATH);

console.log(chalk.green("success"), " components index.css copied to dist folder.");
