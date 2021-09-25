// TODO: Extract to an MDX config into the sg-eslint packages.

module.exports = {
    extends: [
        "@sharegate/eslint-config-react"
    ],
    overrides: [
        {
            extends:[
                "@sharegate/eslint-config-typescript"
            ],
            files: ["*.ts?(x)"],
            rules: {
                "react/jsx-sort-props": "error",
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "no-param-reassign": "off"
            }
        },
        {
            files: ["**/src/*.ts?(x)"],
            plugins: ["sort-destructure-keys", "sort-keys-fix", "typescript-sort-keys"],
            rules: {
                "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
                "sort-destructure-keys/sort-destructure-keys": "error",
                "typescript-sort-keys/interface": ["error", "asc", { natural: true }]
            }
        },
        {
            files: ["**/tests/**/*.ts?(x)"],
            rules: {
                "react/jsx-sort-props": "off"
            }
        }
    ],
    rules: {
        "no-param-reassign": "off",
        "react/destructuring-assignment": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".jsx",".ts", ".tsx", ".mdx"] }]
    }
};
