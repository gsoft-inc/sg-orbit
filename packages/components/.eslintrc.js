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
                "react/jsx-sort-props": "warn"
            }
        },
        {
            files: ["**/src/*.ts?(x)"],
            plugins: ["sort-destructure-keys", "sort-keys-fix", "typescript-sort-keys"],
            rules: {
                "sort-keys-fix/sort-keys-fix": ["warn", "asc", { natural: true }],
                "sort-destructure-keys/sort-destructure-keys": "warn",
                "typescript-sort-keys/interface": ["warn", "asc", { natural: true }]
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
