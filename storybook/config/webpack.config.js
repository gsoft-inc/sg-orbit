const path = require("path");

module.exports = async ({ config }) => {
    const storybookAlias = config.resolve.alias || {};

    config.resolve.alias = {
        ...storybookAlias,
        "@stories": path.resolve(__dirname, "../stories/"),
        "@utils": path.resolve(__dirname, "../utils/")
    };

    return config;
};
