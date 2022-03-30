const { optimize: svgoOptimize } = require("svgo");
const path = require("path");
const config = require("./svgo-config");
const { getFiles } = require("../../../scripts/helper");
const fs = require("fs");

const ICONS_SIZES = [24, 32];

const ensureUniqueNames = data => {
    const dataGroupedBySize = ICONS_SIZES.map(size => data.filter(d => d.sizeInName === size));

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

const validateSize = (width, height, sizeInName, name) => {
    const sizes = ICONS_SIZES;

    if (sizes.includes(Number(width)) && sizes.includes(Number(height))) {
        if(sizeInName !== Number(width) && sizeInName !== Number(height)) {
            console.error(
                `The size of ${name} is not the same as the one in its name. width: ${width} height: ${height}, name: ${sizeInName}`
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

const optimize = async dir => {
    const files = await getFiles(dir);

    const result = files.map(file => {
        const { name, size, group } = parseName(file);

        const svg = fs.readFileSync(file, "utf-8");
        // const { info, data } = svgoOptimize (svg, { path: file, ...config });
        const { info, data } = svgoOptimize (svg, {
            path: file,
            ...config
        });

        validateSize(info.width, info.height, size, name);

        return {
            name,
            sizeInName: size,
            group,
            size: { width: info.width, height: info.height },
            data
        };
    });

    ensureUniqueNames(result);

    return result;
};

module.exports = {
    optimize
};
