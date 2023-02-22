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

const validateIcons = icons => {
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

function optimizeIcons(icons) {
    const result = icons.map(icon => {
        return optimizeIcon(icon);
    });

    validateIcons(result);

    return result;
}

module.exports = {
    optimizeIcons
};
