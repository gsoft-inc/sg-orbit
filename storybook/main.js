const { customizeWebpack } = require("./webpack.config");
const { includeChromatic, includeDocs, printEnvironment } = require("./env");

printEnvironment();

let stories = [];

if (includeDocs) {
    stories = [
        ...stories,
        "../docs/**/*.stories.mdx",
        "../packages/icons/docs/**/*.stories.mdx",
        "../packages/react-components/src/**/docs/**/*.stories.mdx"
    ];
}

if (includeChromatic) {
    stories = [
        ...stories,
        "../packages/foundation/tests/**/*.chroma.jsx",
        "../packages/react-components/src/**/tests/chromatic/**/*.chroma.jsx"
    ];
}

module.exports = {
    stories: stories,
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
    webpackFinal: customizeWebpack
};
