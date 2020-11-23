const path = require("path");

function addWebpackAliases(config) {
    const existingAlias = config.resolve.alias || {};

    config.resolve.alias = {
        ...existingAlias,
        "@root": path.resolve(__dirname, ".."),
        "@react-components": path.resolve(__dirname, "../packages/react-components/src"),
        "@stories/components": path.resolve(__dirname, "./components/"),
        "@stories/utils": path.resolve(__dirname, "./utils/")
    };
}

// function bundleCustomReactComponents(config) {
//     // Otherwise webpack babel-loader will only handle files in /storybook.
//     config.module.rules[0].include.push(path.resolve(__dirname, "..", "packages"));
// }

// Currently required for:
//   - https://github.com/reworkcss/css
// function supportPackagesWithDependencyOnNodeFileSystem(config) {
//     const existingNode = config.node || {};

//     config.node = {
//         ...existingNode,
//         fs: "empty"
//     };
// }

module.exports = {
    customizeWebpack: async config => {
        addWebpackAliases(config);

        return config;
    }
};
