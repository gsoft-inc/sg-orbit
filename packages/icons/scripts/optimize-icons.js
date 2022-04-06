const { optimize } = require("svgo");
const config = require("./svgo-config");
const { ICONS_SIZES } = require("./constants");

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

// remove the size props, and rename sizeInTheName to size
function mergeSizeProps(icons) {

    // eslint-disable-next-line no-unused-vars
    return icons.map(({ size, sizeInTheName, ...rest }) => {
        return {
            ...rest,
            size: sizeInTheName
        };
    });
}

function optimizeIcons(icons) {
    const result = icons.map(icon => {
        return optimizeIcon(icon);
    });

    validateIcons(result);

    return mergeSizeProps(result);
}

module.exports = {
    optimizeIcons
};
