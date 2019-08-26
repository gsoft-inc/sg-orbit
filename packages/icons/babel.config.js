const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: 3,
                modules: false
            }
        ],
        [
            "@babel/preset-react",
            {
                useBuiltIns: true,
                development: !IS_PRODUCTION
            }
        ]
    ],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                regenerator: true,
                useESModules: true
            }
        ],
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
