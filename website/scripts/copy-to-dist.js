const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.cp("-f", "netlify/_redirects", DIST_PATH);

console.log(chalk.green("success"), ` netlify _redirects copied to ${DIST_PATH} folder`);
