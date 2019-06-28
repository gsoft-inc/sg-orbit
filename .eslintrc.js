module.exports = {
    root: true,
    plugins: ["import", "sort-imports-es6-autofix"],
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: 2018
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    rules: {
        "no-console": "off",
        "curly": "warn",
        "sort-imports-es6-autofix/sort-imports-es6": [
            "warn",
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
            }
        ],
        "no-prototype-builtins": "off"
    }
};
