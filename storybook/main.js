const { customizeWebpack } = require("./webpack.config");
const { includeChromatic, includeDocs, printEnvironment } = require("./env");

printEnvironment();

let stories = [];

if (includeDocs) {
    stories = [
        ...stories,
        "../docs/**/*.stories.mdx",
        "../packages/icons/docs/**/*.stories.mdx",
        "../packages/react-components/src/box/docs/**/*.stories.mdx",
        "../packages/react-components/src/button/docs/**/*.stories.mdx",
        "../packages/react-components/src/accordion/docs/**/*.stories.mdx",
        "../packages/react-components/src/link/docs/Link.stories.mdx"
    ];
}

if (includeChromatic) {
    stories = [
        ...stories,
        "../packages/react-components/src/button/tests/chromatic/**/*.chroma.jsx",
        "../packages/react-components/src/accordion/tests/chromatic/**/*.chroma.jsx"
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
