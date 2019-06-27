const chalk = require("chalk");
const shell = require("shelljs");
const es = require("./ensure-success");

const args = process.argv;

if (args.length !== 4) {
    console.error(chalk.red("error"), ` --dest parameter must be specified.`);

    shell.exit(1);
}

const dest = args[3];
const projectPath = es(shell.pwd()).stdout;

if (!shell.test("-d", "dist")) {
    es(shell.mkdir("dist"));
}

es(shell.cp("../../LICENSE", `${projectPath}/${dest}/LICENSE`));