module.exports = {
    extends: [
        "@sharegate/eslint-config-react"
    ],
    plugins: ["jsx-control-statements"],
    overrides: [
        {
            globals: {
                "props": true
            },
            files: ["*.mdx"],
            extends: ["plugin:mdx/recommended"],
            rules: {
                "semi": "off",
                "react/jsx-tag-spacing": "off",
                "max-len": "off"
            }
        }
    ],
    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".mdx"] }]
    }
};
