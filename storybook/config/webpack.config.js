const path = require("path");
const createMdxCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

// NOTE: the source-loader config has not been added to this webpack config, we dont seem to need it.
// For more info about the docs addon config: https://github.com/storybookjs/storybook/blob/next/addons/docs/README.md#manual-configuration
module.exports = async ({ config }) => {
    const storybookAlias = config.resolve.alias || {};

    config.module.rules.push({
        test: /\.(stories)\.mdx$/,
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

    config.resolve.alias = {
        ...storybookAlias,
        "@stories": path.resolve(__dirname, "../stories/"),
        "@utils": path.resolve(__dirname, "../stories/utils/"),
        "@react-components": path.resolve(__dirname, "../../packages/react-components/components/")
    };

    // Otherwise webpack babel-loader will only handle files in /storybook.
    config.module.rules[0].include.push(path.resolve(__dirname, "../..", "packages/react-components/components"));

    return config;
};
