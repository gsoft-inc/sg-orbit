// TODO: Extract to an MDX config into the sg-eslint packages.

module.exports = {
    // TEMP
    parser: "@babel/eslint-parser",
    extends: [
        "@sharegate/eslint-config-react",
        "plugin:jsx-control-statements/recommended"
    ],
    plugins: ["jsx-control-statements"],
    overrides: [
        {
            files: ["*.mdx"],
            globals: {
                "props": true
            },
            extends: ["plugin:mdx/recommended"],
            rules: {
                "semi": "off",
                "react/jsx-tag-spacing": "off",
                "max-len": "off",
                "react-hooks/rules-of-hooks": "off"
            }
        },
        {
            files: ["*.chroma.jsx"],
            rules: {
                "max-len": "off",
                "react/no-array-index-key": "off"
            }
        }
    ],
    rules: {
        "no-param-reassign": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".mdx"] }],
        "react/destructuring-assignment": "off",
        "jsx-control-statements/jsx-use-if-tag": "off"
    }
};
