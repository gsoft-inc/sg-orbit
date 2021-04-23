module.exports = {
    root: true,
    plugins: ["jest"],
    extends: [
        "@sharegate/eslint-config-recommended",
        "@sharegate/eslint-config-sort-imports",
        "plugin:jest/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2018
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        "jest/globals": true
    },
    rules: {
        "linebreak-style": ["warn", "unix"],
        "prefer-const": ["warn", {
            "destructuring": "all"
        }],
        "jest/no-commented-out-tests": "off"
    }
};
