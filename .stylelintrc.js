/** @type {import('stylelint').Config} */
module.exports = {
    extends: ["stylelint-config-standard"],
    rules: {
        // Avoid Errors
        "no-descending-specificity": null, // TODO: Disable from recommended
        "selector-pseudo-class-no-unknown": [ // TODO: dans recommended c'est juste true, on peut tu enlever ça?
            true,
            {
                ignorePseudoClasses: ["global"]
            }
        ],

        // Enforce conventions
        "max-nesting-depth": 2, // TODO: dans aucune config, on le met en extra
        "declaration-block-single-line-max-declarations": 1, // TODO: dans aucune config, on le met en extra
        "font-weight-notation": "numeric",  // TODO: dans aucune config, on le met en extra
        "unit-allowed-list": [ // TODO: dans aucune config, on le met en extra
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

        "color-hex-length": "long", // standard utilise short... on fait le switch ou on garde l'override?
        "selector-class-pattern": null, // TODO: Disable from standard. App uses a camelCase convention for class names since we use CSS Modules.

        // DEBUGGING
        // "import-notation": null, // 172 errors - francis dit correct
        // "selector-not-notation": null, // 69 errors - different, francis dit correct

        // "selector-pseudo-element-colon-notation": null, // 53 errors - correct
        // "declaration-empty-line-before": null, // 40 errors - correct
        // "value-keyword-case": null, // 22 errors - correct
        // "color-function-notation": null, // 8 errors - correct
        // "rule-empty-line-before": null, // 7 errors - correct
        // "number-max-precision": null, // 1 error - correct
        // "hue-degree-notation": null, // 1 error - correct
        // "comment-empty-line-before": null, // 39 errors - correct

        // "alpha-value-notation": null, // 8 errors - ????
        // "property-no-vendor-prefix": null, // 6 errors - ????
        // "custom-property-empty-line-before": null, // 4 errors - ?????
        // "declaration-block-no-redundant-longhand-properties": null, // 8 errors - Je pense qu'on va vouloir disable lui??
     }
};
