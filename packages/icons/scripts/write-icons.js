const chalk = require("chalk");
const shell = require("shelljs");
const { loadIcons } = require("./load-icons");
const { optimizeIcons } = require("./optimize-icons");
const fs = require("fs");

const SRC_PATH = "src";
const DIST_PATH = "dist";

const writeIcons = (icons, dir) => {
    if (!shell.test("-d", dir)) {
        shell.mkdir(dir);
    }

    icons.map(async ({ data, name }) => {
        fs.writeFileSync(`${dir}/${name}`, data, err => {
            if (err) {
                throw err;
            }
        });
    });
};

console.log("Optimizing and building icons...");

loadIcons(SRC_PATH)
    .then(icons => optimizeIcons(icons))
    .then(icons => writeIcons(icons, DIST_PATH))
    .catch(error => console.error(error))
    .then(() => console.log(chalk.green("Build icons completed!")));
