// TODO: Extract to an MDX config into the sg-eslint packages.

module.exports = {
    extends: [
        "@sharegate/eslint-config-react",
        "plugin:jsx-control-statements/recommended",
        "plugin:mdx/recommended"
    ],
    plugins: ["jsx-control-statements"],
    overrides: [
        {
            files: ["*.mdx"],
            extends: ["plugin:mdx/overrides"],
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
