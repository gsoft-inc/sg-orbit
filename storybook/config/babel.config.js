const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    presets: [
        "@babel/preset-env",
        [
            "@babel/preset-react",
            {
                development: !IS_PRODUCTION
            }
        ]
    ],
    plugins: [
        [
            // Enable loose mode to use assignment instead of defineProperty
            // See discussion in https://github.com/facebook/create-react-app/issues/4263
            "@babel/plugin-proposal-class-properties",
            {
                loose: true
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
    ]
};
