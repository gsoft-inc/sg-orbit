const chalk = require("chalk");
const shell = require("shelljs");
const es = require("../../scripts/ensure-success");

const dest = "dist";

const projectPath = shell.pwd();

if (!shell.test("-d", "dist")) {
    es(shell.mkdir("dist"));
}

// Navigate up until we find the LICENSE file.
while(!shell.test("-f", "_redirects")) {
    es(shell.cd(".."));
}

es(shell.cp("_redirects", `${projectPath}/${dest}/_redirects`));

console.log(chalk.green("success"), ` Copied _redirects to ${projectPath}/${dest}`);
