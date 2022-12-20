/** @type {import('stylelint').Config} */
module.exports = {
    extends: "@sharegate/stylelint-config-recommended",
    rules: {
        "linebreaks": "unix",
        "function-comma-space-after": "always",
        "function-parentheses-space-inside": "never",
        "function-whitespace-after": "always",
        "block-opening-brace-space-before": "always",
        "property-case": "lower",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-combinator-space-before": "always",
        "selector-combinator-space-after": "always",
    }
};
