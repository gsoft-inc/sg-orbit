const path = require("path");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const webpack = require("webpack");

function addWebpackAliases(config) {
    const existingAlias = config.resolve.alias || {};

    config.resolve.alias = {
        ...existingAlias,
        "@root": path.resolve(__dirname, ".."),
        "@react-components": path.resolve(__dirname, "../packages/react-components/src"),
        "@stories/components": path.resolve(__dirname, "./components/"),
        "@stories/mdx": path.resolve(__dirname, "./mdx/"),
        "@stories/utils": path.resolve(__dirname, "./utils/")
    };
}

// Currently required for:
//   - https://github.com/reworkcss/css
function supportPackagesWithDependencyOnNodeFileSystem(config) {
    const existingNode = config.node || {};

    config.node = {
        ...existingNode,
        fs: "empty"
    };
}

function ignoreJarleWarning(config) {
    config.plugins.push(new FilterWarningsPlugin({
        exclude: /Module not found: Error: Can't resolve 'holderjs'/
    }));
}

function ignorePrettierParsers(config) {
    config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/parser-standalone$/,
        contextRegExp: /prettier$/
    }));

    config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/parser-flow$/,
        contextRegExp: /prettier$/
    }));

    config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/parser-typescript$/,
        contextRegExp: /prettier$/
    }));
}

module.exports = {
    customizeWebpack: async config => {
        addWebpackAliases(config);
        supportPackagesWithDependencyOnNodeFileSystem(config);
        ignoreJarleWarning(config);
        ignorePrettierParsers(config);

        return config;
    }
};
