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
        "../packages/react-components/src/alert/docs/**/*.stories.mdx",
        "../packages/react-components/src/badge/docs/**/*.stories.mdx",
        "../packages/react-components/src/checkbox/docs/**/*.stories.mdx",
        "../packages/react-components/src/counter/docs/**/*.stories.mdx",
        "../packages/react-components/src/disclosure/docs/**/*.stories.mdx",
        "../packages/react-components/src/divider/docs/**/*.stories.mdx",
        "../packages/react-components/src/dot/docs/**/*.stories.mdx",
        "../packages/react-components/src/field/docs/**/*.stories.mdx",
        "../packages/react-components/src/form/docs/**/*.stories.mdx",
        "../packages/react-components/src/heading/docs/**/*.stories.mdx",
        "../packages/react-components/src/icons/docs/**/*.stories.mdx",
        "../packages/react-components/src/image/docs/**/*.stories.mdx",
        "../packages/react-components/src/input/docs/**/*.stories.mdx",
        "../packages/react-components/src/lozenge/docs/**/*.stories.mdx",
        "../packages/react-components/src/paragraph/docs/**/*.stories.mdx",
        "../packages/react-components/src/tabs/docs/**/*.stories.mdx",
        "../packages/react-components/src/link/docs/**/*.stories.mdx"
    ];
}

if (includeChromatic) {
    stories = [
        ...stories,
        "../packages/foundation/tests/**/*.chroma.jsx",
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
