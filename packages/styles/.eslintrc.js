module.exports = {
    extends: [
        "@sharegate/eslint-config-react",
        "@sharegate/eslint-config-typescript"
    ],
    overrides: [
        {
            files: ["scripts/*.js"],
            rules: {
                "@typescript-eslint/no-var-requires": "off"
            }
        },
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
                "no-unused-expressions": "off",
                "no-unused-vars": "off",
                "react/jsx-no-undef": "off"
            }
        },
        {
            files: ["**/src/*.ts?(x)"],
            plugins: ["typescript-sort-keys", "sort-keys-fix"],
            rules: {
                "sort-keys-fix/sort-keys-fix": "error",
                "typescript-sort-keys/interface": "error"
            }
        }
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-param-reassign": "off",
        "react/destructuring-assignment": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts", ".tsx", ".mdx"] }]
    }
};
