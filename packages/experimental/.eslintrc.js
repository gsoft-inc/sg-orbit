module.exports = {
    overrides: [
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
                "no-undef": "off",
                "react/jsx-no-undef": "off"
            }
        },
        {
            files: ["*.ts?(x)"],
            rules: {
                "react/jsx-sort-props": "error",
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/no-explicit-any": "off"
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
    ]
};
