const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";

shell.rm("-rf", DIST_PATH);

shell.cp("-R", "semantic/dist/components", DIST_PATH);
shell.cp("-R", "semantic/dist/themes", DIST_PATH);
shell.cp("-R", "semantic/dist/semantic.css", "semantic/dist/semantic.min.css", "semantic/dist/semantic.js", "semantic/dist/semantic.min.js", DIST_PATH);

shell.rm("-rf", `${DIST_PATH}/themes/default`);

console.log(chalk.green("success"), " semantic dist output copied to dist folder.");

