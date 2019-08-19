module.exports = {
    extends: ["@sharegate/eslint-config-react", "plugin:mdx/recommended"],
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
