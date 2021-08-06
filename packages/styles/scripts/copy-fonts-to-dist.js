const chalk = require("chalk");
const shell = require("shelljs");

const DIST_PATH = "dist";
const FONT_PATH = "src/font";

shell.cp("-f", [`${FONT_PATH}/*.ttf`, `${FONT_PATH}/*.woff`, `${FONT_PATH}/*.woff2`], DIST_PATH);

console.log(chalk.green("success"), " styles copied fonts to dist folder.");

