const fs = require("fs");
const path = require("path");

const clearDir = dir => {
    fs.rmSync(dir, { recursive: true, force: true });
};

const checkFolderExist = dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }, err => {
            throw err;
        });
    }
};

const getAllFiles = (dirPath, arrayOfFiles = []) => {
    const files = fs.readdirSync(dirPath);

    let returnObject = [...arrayOfFiles];

    files.forEach(file => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            returnObject = getAllFiles(dirPath + "/" + file, returnObject);
        } else {
            returnObject.push(path.join(dirPath, "/", file));
        }
    });

    return returnObject;
};

const getFiles = dir => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dir)) {
            resolve(getAllFiles(dir));
        } else {
            reject(`no such directory ${dir}`);
        }
    });
};


exports.checkFolderExist = checkFolderExist;
exports.getFiles = getFiles;
exports.clearDir = clearDir;
