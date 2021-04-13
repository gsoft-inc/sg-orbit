// TODO: Extract to an MDX config into the sg-eslint packages.

module.exports = {
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
        },
        {
            files: ["*.sample.jsx"],
            rules: {
                "no-unused-vars": "off",
                "no-unused-expressions": "off",
                "react/jsx-no-undef": "off",
                "jsx-control-statements/jsx-jcs-no-undef": "off"
            }
        },
        {
            files: ["*.ts?(x)"],
            extends:[
                "@sharegate/eslint-config-typescript"
            ],
            rules: {
                "no-param-reassign": "off",
                "@typescript-eslint/no-explicit-any": "off",

                "jsx-control-statements/jsx-jcs-no-undef": "off",
                "@typescript-eslint/ban-ts-comment": "off",

                "@typescript-eslint/member-delimiter-style": ["warn"],
                "@typescript-eslint/consistent-type-definitions": ["warn"]
            }
        }
    ],
    rules: {
        "no-param-reassign": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts", ".tsx", ".mdx"] }],
        "react/destructuring-assignment": "off",
        "jsx-control-statements/jsx-use-if-tag": "off"
    }
};
