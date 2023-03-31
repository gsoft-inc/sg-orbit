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
     }
};
