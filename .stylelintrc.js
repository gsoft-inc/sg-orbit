module.exports = {
    extends: "@sharegate/stylelint-config-recommended",
    rules: {
        "linebreaks": "unix",
        "no-descending-specificity": null,
        "declaration-colon-space-after": "always-single-line",
        "unit-whitelist": [
            "em",
            "rem",
            "px",
            "%",
            "fr",
            "deg",
            "vh",
            "vw",
            "s",
            "ch"
        ],
        // "block-opening-brace-newline-before": "never-multi-line",
        // "block-opening-brace-space-before": "always",
    }
};
