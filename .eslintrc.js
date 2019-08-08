module.exports = {
    root: true,
    extends: ["@sharegate/eslint-config-recommended", "@sharegate/eslint-config-sort-imports"],
    parserOptions: {
        ecmaVersion: 2018
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    }
};
