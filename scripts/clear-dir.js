const chalk = require("chalk");
const es = require("./ensure-success");
const meow = require("meow");
const shell = require("shelljs");

const USAGE = `
Usage
    $ clear-dir <name>

    The <name> input is relative to the current working directory.

Examples
    $ clear-dir dist
`;

const cli = meow(USAGE, {
    description: false
});

const folder = cli.input[0];

if (!folder) {
    cli.showHelp(1);
}

const projectPath = es(shell.pwd()).stdout;

const directoryPath = `${projectPath}/${folder}`;

if (shell.test("-d", directoryPath)) {
    es(shell.rm("-rf", `${directoryPath}/*`));

    console.log(chalk.green("success"), ` Cleared directory ${directoryPath}`);
}


