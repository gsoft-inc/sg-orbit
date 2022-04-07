module.exports = {
    extends: "@sharegate/stylelint-config-recommended",
    rules: {
        "linebreaks": "unix",
        "no-descending-specificity": null,
        "declaration-colon-space-after": "always-single-line",
        "unit-allowed-list": [
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
        ]
    }
};
