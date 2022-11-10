const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const { ICONS_SIZES } = require("./constants");

const getAllFiles = (dirPath, arrayOfFiles = []) => {
    const files = fs.readdirSync(dirPath);

    let returnObject = [...arrayOfFiles];

    files.forEach(file => {
        if (shell.test("-d", dirPath + "/" + file)) {
            returnObject = getAllFiles(dirPath + "/" + file, returnObject);
        } else {
            returnObject.push(path.join(dirPath, file));
        }
    });

    return returnObject;
};

const getFiles = dir => {
    return new Promise((resolve, reject) => {
        if (shell.test("-d", dir)) {
            resolve(getAllFiles(dir));
        } else {
            reject(`no such directory ${dir}`);
        }
    });
};


const parseName = file => {
    const splitPath = file.split(path.sep);
    const fileName = splitPath[splitPath.length - 1];
    const size = ICONS_SIZES.find(s => fileName.replace(".svg", "").endsWith(s))?.toString(); // find the icon size
    const group = fileName.replace(`-${size}.svg`, "");

    if (!fileName.startsWith("icon-")) {
        console.error(
            "The icon name must start with icon-: ",
            file
        );
        process.exit(1);
    }

    if (!size) {
        console.error(
            "The icon name must contain its size: ",
            file
        );
        process.exit(1);
    }

    return { name: fileName, size: Number(size), group };
};

const loadFiles = async dir => {
    const files = await getFiles(dir);

    return files.map(file => {
        const { name, size, group } = parseName(file);
        const content = fs.readFileSync(file, "utf-8");

        return {
            name,
            sizeInTheName: size,
            group,
            filePath: file,
            content
        };
    });
};


async function loadIcons(dir) {
    return loadFiles(dir);
}


module.exports = {
    loadIcons
};
