const chalk = require("chalk");
const shell = require("shelljs");
const { loadOptimizedIcons } = require("./load-optimized-icons");
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

loadOptimizedIcons(SRC_PATH)
    .then(icons => {
        writeIcons(icons, DIST_PATH);
    })
    .catch(error => console.error(error))
    .then(() => console.log(chalk.green("Build icons completed!")));
