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
        "no-prototype-builtins": "off",

        // ESLint rules to mimicks default Prettier format
        "max-len": ["warn", { "code": 300, "tabWidth": 4 }],
        "indent": ["warn", 4],
        "semi": ["warn", "always"],
        "quotes": ["warn", "double"],
        "comma-dangle": ["warn", "never"],
        "object-curly-spacing": ["warn", "always"],
        "arrow-parens": ["warn", "as-needed"],
        "linebreak-style": "off",
        // "quote-props": ["warn", "as-needed"],
        "quote-props": "off",
        "react/jsx-closing-bracket-location": [1, "line-aligned"]
    }
};
