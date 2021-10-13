const { customizeWebpack } = require("./webpack.config");
const { includeChromatic, includeDocs, printEnvironment, isChromatic, isDebug } = require("./env");

printEnvironment();

let stories = [];

if (includeDocs) {
    stories = [
        "../docs/**/*.stories.mdx",
        "../packages/icons/docs/**/*.stories.mdx",
        "../packages/react-components/src/**/docs/**/*.stories.mdx"
    ];
}

if (includeChromatic) {
    stories = [
        ...stories,
        "../packages/react-components/**/tests/chromatic/**/*.chroma.jsx"
    ];
}

const config = {
    stories: stories,
    addons: [
        {
            name: "@storybook/addon-essentials",
            options: {
                actions: false,
                backgrounds: false,
                controls: false,
                measure: false,
                outline: false
            }
        },
        {
            name: "@storybook/addon-a11y",
            options: {
                runOnly: {
                    type: "tag",
                    values: ["wcag2a", "wcag2aa"]
                }
            }
        }
    ],
    webpackFinal: customizeWebpack
};

// An optimized version of the components props will be visibile in the production build. It's available for debug & chromatic because the performance cost is too big.
if (!isChromatic && !isDebug) {
    config.typescript = {
        reactDocgenTypescriptOptions: {
            // Slow down Storybook initial rendering by 3x but his essential to render a union values instead of a named export (e.g. will render "top" | "bottom" instead of PositionProp).
            shouldExtractValuesFromUnion: true,
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
        }
    };
}

module.exports = config;
