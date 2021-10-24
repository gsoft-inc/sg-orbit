const chalk = require("chalk");
const es = require("./ensure-success");
const meow = require("meow");
const shell = require("shelljs");

const USAGE = `
Usage
    $ create-dir <name>

    The <name> input is relative to the current working directory.

Examples
    $ create-dir name
`;

const cli = meow(USAGE, {
    description: false
});

const name = cli.input[0];

if (!name) {
    cli.showHelp(1);
}

const projectPath = es(shell.pwd()).stdout;

const directoryPath = `${projectPath}/${name}`;

if (!shell.test("-d", directoryPath)) {
    shell.mkdir(directoryPath);

    console.log(chalk.green("success"), `${directoryPath} directory created.`);
}
