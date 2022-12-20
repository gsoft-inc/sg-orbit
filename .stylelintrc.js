/** @type {import('stylelint').Config} */
module.exports = {
    extends: "@sharegate/stylelint-config-recommended",
    rules: {
        "linebreaks": "unix",

        "color-hex-length": "long",
        "property-case": "lower",

        "function-comma-space-after": "always",
        "function-parentheses-space-inside": "never",
        "function-whitespace-after": "always",

        "block-closing-brace-empty-line-before": "never",
        "block-closing-brace-newline-after": "always",
        "block-closing-brace-newline-before": "always-multi-line",
        "block-closing-brace-space-after": "always-single-line",
        "block-closing-brace-space-before": "always-single-line",
        "block-opening-brace-newline-after": "always",
        "block-opening-brace-newline-before": "never-single-line",
        "block-opening-brace-space-after": "always-single-line",
        "block-opening-brace-space-before": "always",

        "selector-attribute-brackets-space-inside": "never",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-combinator-space-before": "always",
        "selector-combinator-space-after": "always",
        "selector-pseudo-class-parentheses-space-inside": "never",
        "selector-pseudo-element-case": "lower",
        "selector-pseudo-class-case": "lower",
        "selector-max-empty-lines": 0,
        "selector-descendant-combinator-no-non-space": true,

        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-case": "lower",
        "media-feature-parentheses-space-inside": "never",
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",
    }
};
