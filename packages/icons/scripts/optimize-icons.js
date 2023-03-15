const { optimize } = require("svgo");
const config = require("./svgo-config");

const ensureUniqueNames = data => {
    const unique = [...new Set(data.map(d => d.name))];

    const lookup = data.reduce((a, e) => {
        a[e.name] = ++a[e.name] || 0;

        return a;
    }, {});

    if (data.length !== unique.length) {
        console.error(
            "Array contains duplicates icon name: ",
            data.filter(e => lookup[e.name])
        );
        process.exit(1);
    }
};

const validateIcons = icons => {
    ensureUniqueNames(icons);
};

const validateSize = (width, height, name) => {
    const sizes = [20];

    if (sizes.includes(Number(width)) && sizes.includes(Number(height))) {
        if (Number(width) !== Number(height)) {
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

let width = null;
let height = null;

const plugin = {
    name: "find-size",
    fn: () => {
        return {
            element: {
                enter: (node, parentNode) => {
                    if (parentNode.type === "root") {
                        width = node.attributes.width;
                        height = node.attributes.height;
                    }
                }
            }
        };
    }
};

const optimizeIcon = icon => {
    const { content, filePath, ...rest } = icon;

    const { data } = optimize(content, {
        path: filePath,
        ...config,
        plugins: [...config.plugins, plugin]
    });

    return {
        ...rest,
        size: {
            width: width,
            height: height
        },
        data
    };
};

function optimizeIcons(icons) {
    const result = icons.map(icon => {
        return optimizeIcon(icon);
    });

    validateIcons(result);
    result.forEach(icon => {
        validateSize(icon.size.width, icon.size.height, icon.name);
    });

    return result;
}

module.exports = {
    optimizeIcons
};
