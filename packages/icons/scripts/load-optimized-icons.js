const { optimize } = require("svgo");
const path = require("path");
const config = require("./svgo-config");
const fs = require("fs");
const shell = require("shelljs");

const ICONS_SIZES = [24, 32];

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
        if(shell.test("-d", dir)) {
            resolve(getAllFiles(dir));
        } else {
            reject(`no such directory ${dir}`);
        }
    });
};

const ensureUniqueNames = data => {
    const dataGroupedBySize = ICONS_SIZES.map(size => data.filter(d => d.sizeInTheName === size));

    dataGroupedBySize.forEach(groupedData => {
        const unique = [...new Set(groupedData.map(d => d.name))];

        const lookup = groupedData.reduce((a, e) => {
            a[e.name] = ++a[e.name] || 0;

            return a;
        }, {});

        if (groupedData.length !== unique.length) {
            console.error(
                "Array contains duplicates icon name: ",
                groupedData.filter(e => lookup[e.name])
            );
            process.exit(1);
        }
    });
};

const parseName = file => {
    const splitPath = file.split(path.sep);
    const fileName = splitPath[splitPath.length - 1];
    const size = ICONS_SIZES.find(s => fileName.replace(".svg", "").endsWith(s))?.toString(); // find the icon size
    const group = fileName.replace(`-${size}.svg`, "");

    if(!fileName.startsWith("icon-")) {
        console.error(
            "The icon name must start with icon-: ",
            file
        );
        process.exit(1);
    }

    if(!size) {
        console.error(
            "The icon name must contain its size: ",
            file
        );
        process.exit(1);
    }

    return { name: fileName, size: Number(size), group };
};

const validateSize = (width, height, sizeInTheName, name) => {
    const sizes = ICONS_SIZES;

    if (sizes.includes(Number(width)) && sizes.includes(Number(height)) ) {
        if(sizeInTheName !== Number(width) && sizeInTheName !== Number(height)) {
            console.error(
                `The size of ${name} is not the same as the one in its name. width: ${width} height: ${height}, name: ${sizeInTheName}`
            );
            process.exit(1);
        }

        if(Number(width) !== Number(height)) {
            console.error(
                `The size of ${name} is not square. width: ${width} height: ${height}`
            );
            process.exit(1);
        }

        return true;
    } else {
        console.error(
            `The size of ${name} is not correct. width: ${width} height: ${height}`
        );
        process.exit(1);
    }
};

const validateIcons = icons => {
    icons.forEach(icon => {
        validateSize(icon.size.width, icon.size.height, icon.sizeInTheName, icon.name);
    });

    ensureUniqueNames(icons);
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

const optimizeIcon = icon => {
    const { content, filePath, ...rest } = icon;

    const { info, data } = optimize(content, {
        path: filePath,
        ...config
    });

    return {
        ...rest,
        size: { width: info.width, height: info.height },
        data
    };
};

function mergeSizeProps(icons) {
    // after validation, we know that the size in the name is the same as the size in the svg, and that the svg is square. We can now merge the size props

    // remove the size props, and rename sizeInTheName to size
    // eslint-disable-next-line no-unused-vars
    return icons.map(({ size, sizeInTheName, ...rest }) => {
        return {
            ...rest,
            size: sizeInTheName
        };
    });
}

const loadOptimizedIcons = async dir => {
    const iconFiles = await loadFiles(dir);

    const result = iconFiles.map(icon => {
        return optimizeIcon(icon);
    });

    validateIcons(result);

    return mergeSizeProps(result);
};


module.exports = {
    loadOptimizedIcons
};
