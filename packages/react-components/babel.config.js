module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
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