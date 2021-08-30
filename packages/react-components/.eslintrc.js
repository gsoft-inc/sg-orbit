// TODO: Extract to an MDX config into the sg-eslint packages.

module.exports = {
    extends: [
        "@sharegate/eslint-config-react",
        "plugin:jsx-control-statements/recommended"
    ],
    overrides: [
        {
            extends: ["plugin:mdx/recommended"],
            files: ["*.mdx"],
            globals: {
                "props": true
            },
            rules: {
                "max-len": "off",
                "react-hooks/rules-of-hooks": "off",
                "react/jsx-tag-spacing": "off",
                "semi": "off"
            }
        },
        {
            files: ["*.chroma.jsx"],
            rules: {
                "max-len": "off",
                "react/no-array-index-key": "off"
            }
        },
        {
            files: ["*.sample.jsx"],
            rules: {
                "jsx-control-statements/jsx-jcs-no-undef": "off",
                "no-unused-expressions": "off",
                "no-unused-vars": "off",
                "react/jsx-no-undef": "off"
            }
        },
        {
            extends:[
                "@sharegate/eslint-config-typescript"
            ],
            files: ["*.ts?(x)"],
            rules: {
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "jsx-control-statements/jsx-jcs-no-undef": "off",
                "no-param-reassign": "off"
            }
        }
    ],
    plugins: ["jsx-control-statements"],
    rules: {
        "jsx-control-statements/jsx-use-if-tag": "off",
        "no-param-reassign": "off",
        "react/destructuring-assignment": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts", ".tsx", ".mdx"] }],
        "sort-keys": "error"
    }
};
