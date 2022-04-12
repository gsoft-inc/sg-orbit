const path = require("path");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const webpack = require("webpack");

function addWebpackAliases(config) {
    const existingAlias = config.resolve.alias || {};

    config.resolve.alias = {
        ...existingAlias,
        "@root": path.resolve(__dirname, ".."),
        "@css": path.resolve(__dirname, "../packages/css/src"),
        "@components": path.resolve(__dirname, "../packages/components/src"),
        "@stories/components": path.resolve(__dirname, "./components"),
        "@stories/mdx": path.resolve(__dirname, "./mdx"),
        "@stories/utils": path.resolve(__dirname, "./utils")
    };
}

function supportRawInlineImport(config) {
    const rules = config.module.rules;

    // Must match the babel-loader rule in this file https://github.com/storybookjs/storybook/blob/next/lib/manager-webpack5/src/presets/babel-loader-manager.ts
    const babelRule = rules.find(x => x.test.test(".jsx") && x.use && x.use[0]?.loader && x.use[0].loader.includes("babel-loader"));
    babelRule.resourceQuery = { not: [/raw/] };

    rules.push({
        type: "asset/source",
        resourceQuery: /raw/
    });
}

// Currently required for:
//   - https://github.com/reworkcss/css
function supportPackagesWithDependencyOnNodeFileSystem(config) {
    config.resolve.fallback.fs = false;
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
        supportRawInlineImport(config);
        supportPackagesWithDependencyOnNodeFileSystem(config);
        ignoreJarleWarning(config);
        ignorePrettierParsers(config);

        // console.log(JSON.stringify(config, null, 2));

        // config.module.rules.forEach(x => {
        //     if (Array.isArray(x.use)) {
        //         x.use.forEach(y => {
        //             console.log(JSON.stringify(y, null, 2));
        //             console.log(JSON.stringify(y.options, null, 2));
        //         });
        //     } else {
        //         console.log(JSON.stringify(x.use, null, 2));
        //     }
        // });

        return config;
    }
};
