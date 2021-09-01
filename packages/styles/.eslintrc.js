module.exports = {
    extends: [
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
            files: ["**/src/*.ts?(x)"],
            plugins: ["sort-destructure-keys", "sort-keys-fix", "typescript-sort-keys"],
            rules: {
                "sort-keys-fix/sort-keys-fix": "error",
                "sort-destructure-keys/sort-destructure-keys": "error",
                "typescript-sort-keys/interface": "error"
            }
        }
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-param-reassign": "off"
    }
};
