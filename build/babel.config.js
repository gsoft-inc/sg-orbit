const IS_TEST = process.env.NODE_ENV === "test";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    sourceMaps: IS_PRODUCTION ? undefined : "inline",
    presets: [
        "@babel/typescript",
        !IS_TEST && [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: 3,
                modules: false
            }
        ],
        IS_TEST && [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
                useBuiltIns: true,
                development: !IS_PRODUCTION
            }
        ]
    ].filter(Boolean),
    plugins: [
        [
            // Enable loose mode to use assignment instead of defineProperty
            // See discussion in https://github.com/facebook/create-react-app/issues/4263
            "@babel/plugin-proposal-class-properties",
            {
                loose: true
            }
        ],
        [
            // Added to silent the following warning.
            // The "loose" option must be the same for @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods and @babel/plugin-proposal-private-property-in-object (when they are enabled):
            // you can silence this warning by explicitly adding ["@babel/plugin-proposal-private-methods", { "loose": true }] of the "plugins" section of your Babel config.
            "@babel/plugin-proposal-private-methods",
            {
                "loose": true
            }
        ],
        [
            // Added to silent the following warning.
            // The "loose" option must be the same for @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods and @babel/plugin-proposal-private-property-in-object (when they are enabled):
            // you can silence this warning by explicitly adding ["@babel/plugin-proposal-private-methods", { "loose": true }] of the "plugins" section of your Babel config.
            "@babel/plugin-proposal-private-property-in-object",
            {
                "loose": true
            }
        ],
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: !IS_TEST,
                regenerator: true,
                useESModules: !IS_TEST
            }
        ],
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
        IS_PRODUCTION && "babel-plugin-jsx-remove-data-test-id",
        !IS_TEST && [
            "babel-plugin-named-asset-import",
            {
                loaderMap: {
                    svg: {
                        "ReactComponent": "@svgr/webpack?-svgo,+ref![path]"
                    }
                }
            }
        ]
    ].filter(Boolean)
};
