const chalk = require("chalk");
const shell = require("shelljs");
const es = require("./ensure-success");

es(shell.rm("-f", "yarn.lock"), "Cannot delete yarn.lock");

console.log(chalk.green("success"), `Deleted yarn.lock`);
