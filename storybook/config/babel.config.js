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
        "@babel/plugin-proposal-class-properties",
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
