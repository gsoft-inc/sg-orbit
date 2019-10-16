const path = require("path");
const createMdxCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = async ({ config }) => {
    const storybookAlias = config.resolve.alias || {};

    // Added for docs addons: https://github.com/storybookjs/storybook/blob/next/addons/docs/README.md#manual-configuration
    config.module.rules.push({
        test: /\.(docs)\.mdx$/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    plugins: ["@babel/plugin-transform-react-jsx"]
                }
            },
            {
                loader: "@mdx-js/loader",
                options: {
                    compilers: [createMdxCompiler({})]
                }
            }
        ]
    });

    // Added for docs addons: https://github.com/storybookjs/storybook/blob/next/addons/docs/README.md#manual-configuration
    // TODO: Do we need to include @orbit-ui components from node_modules?
    // TODO: Docs stories could be more like ".docs.js"
    // config.module.rules.push({
    //     test: /\.(docs)\.mdx?$/,
    //     loader: require.resolve("@storybook/source-loader"),
    //     exclude: [/node_modules/],
    //     enforce: "pre"
    // });

    config.resolve.alias = {
        ...storybookAlias,
        "@utils": path.resolve(__dirname, "../utils/")
    };

    // Otherwise webpack babel-loader will only handle files in /storybook.
    config.module.rules[0].include.push(path.resolve(__dirname, "../..", "packages/react-components/components"));

    return config;
};
