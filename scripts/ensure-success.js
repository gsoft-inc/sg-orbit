const chalk = require("chalk");
const shell = require("shelljs");

function ensureSuccess(result, errorMessage) {
    if (result.code !== 0) {
        if (errorMessage) {
            console.error(chalk.red("error"), ` ${errorMessage}`);
        }

        if (result.stderr && result.stderr !== "") {
            console.error(chalk.red("error"), ` ${result.stderr}`);
        }

        shell.exit(1);
    }

    return result;
}

module.exports = ensureSuccess;