const IS_TEST = process.env.NODE_ENV === "test";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    sourceMaps: IS_PRODUCTION ? undefined : "inline",
    sourceType: "unambiguous",
    presets: [
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
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: !IS_TEST,
                regenerator: true,
                useESModules: !IS_TEST
            }
        ],
        "babel-plugin-jsx-control-statements",
        "babel-plugin-react-require",
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
        ],
        "babel-plugin-add-react-displayname"
    ].filter(Boolean)
};
