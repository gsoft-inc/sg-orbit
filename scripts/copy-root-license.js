const meow = require("meow");
const chalk = require("chalk");
const shell = require("shelljs");
const es = require("./ensure-success");

const USAGE = `
Usage
    $ copy-root-license <dest>

    The <dest> input is relative to the current working directory.

Examples
    $ copy-root-license dist
`;

const cli = meow(USAGE, {
    description: false
});

const dest = cli.input[0];

if (!dest) {
    cli.showHelp(1);
}

const projectPath = es(shell.pwd()).stdout;

if (!shell.test("-d", "dist")) {
    es(shell.mkdir("dist"));
}

es(shell.cp("../../LICENSE", `${projectPath}/${dest}/LICENSE`));

console.log(chalk.green("success"), ` Copied LICENSE to ${projectPath}/${dest}`);
