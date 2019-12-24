module.exports = {
    extends: "@sharegate/stylelint-config-recommended",
    rules: {
        "indentation": 4,
        "linebreaks": "unix",
        "max-empty-lines": [1, { ignore: ["comments"] }],
        "no-empty-first-line": true,
        "declaration-block-trailing-semicolon": null,
        "rule-empty-line-before": ["always", { except: ["after-single-line-comment", "inside-block-and-after-rule", "first-nested"] }],
        "block-opening-brace-newline-after": "always",
        "block-closing-brace-newline-before": "always",
        // "block-opening-brace-newline-before": "never-multi-line",
        // "block-opening-brace-space-before": "always",
        "declaration-bang-space-before": "always",
        "declaration-colon-space-after": "always",
        "declaration-empty-line-before": "never",
        "property-case": "lower",
        "unit-case": "lower",
        "string-quotes": "double",
        "font-weight-notation": "numeric"
    }
};
