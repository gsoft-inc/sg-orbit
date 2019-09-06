const path = require("path");

module.exports = async ({ config }) => {
    const storybookAlias = config.resolve.alias || {};

    config.resolve.alias = {
        ...storybookAlias,
        "@stories": path.resolve(__dirname, "../stories/"),
        "@utils": path.resolve(__dirname, "../utils/")
    };

    // Otherwise webpack babel-loader will only handle files in /storybook.
    config.module.rules[0].include.push(path.resolve(__dirname, "../..", "packages/react-components/components"));

    return config;
};
