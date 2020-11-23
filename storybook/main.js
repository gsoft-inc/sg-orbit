const { customizeWebpack } = require("./webpack.config");

module.exports = {
    stories: [
        "../packages/react-components/src/box/**/*.stories.mdx",
        "../packages/react-components/src/button/**/*.stories.mdx"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
    webpackFinal: customizeWebpack
};
