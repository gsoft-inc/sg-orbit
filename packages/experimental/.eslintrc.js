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
            files: ["*.ts?(x)"],
            rules: {
                "react/jsx-sort-props": "error"
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
