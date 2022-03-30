module.exports = {
    multipass: true,
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    removeViewBox: false,
                    convertColors: {
                        active: true,
                        params: {
                            currentColor: true
                        }
                    }
                }
            }
        },
        { name: "removeXMLNS" },
        { name: "convertStyleToAttrs" },
        { name: "sortAttrs" },
        { name: "removeStyleElement" },
        { name: "removeScriptElement" }
    ]
};
