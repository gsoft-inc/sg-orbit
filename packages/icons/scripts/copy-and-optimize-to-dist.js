const chalk = require("chalk");
const { checkFolderExist } = require("../../../scripts/helper");
const fs = require("fs");
const { optimize } = require("./optimize");

const SRC_PATH = "src";
const DIST_PATH = "dist";

const generateSvg = (svgList, dir) => {
    checkFolderExist(dir);
    console.log("\n⚙️  Svg generation...");

    svgList.map(async svg => {
        const { data, name } = svg;

        fs.writeFile(`${dir}/${name}`, data, err => {
            if (err) {throw err;}
        });
    });

    console.log("✨ The icons has been saved!");
};

console.log("\nBuild started...");

optimize(SRC_PATH)
    .then(icons => {
        generateSvg(icons, DIST_PATH);
    })
    .catch(error => console.error(error))
    .then(() => console.log(chalk.green("\n🚀 Build completed!\n")));
