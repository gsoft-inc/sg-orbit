const { customizeWebpack } = require("./webpack.config");
const { includeChromatic, includeDocs, printEnvironment } = require("./env");

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
        "../packages/react-components/src/**/tests/chromatic/**/*.chroma.jsx"
    ];
}

module.exports = {
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
