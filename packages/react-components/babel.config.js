const IS_TEST = process.env.NODE_ENV === "test";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    sourceMaps: IS_PRODUCTION ? undefined : "inline",
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
                regenerator: true,
                useESModules: true
            }
        ],
        "babel-plugin-jsx-control-statements",
        "babel-plugin-react-require",
        "styled-jsx/babel",
        [
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

