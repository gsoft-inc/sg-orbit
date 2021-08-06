/*
POTENTIALLY MISSING:
- letterSpacings -> YES
- breakpoints
*/

export type FixedSizeArray<N extends number, T> = N extends 0 ? never[] : {
    0: T;
    length: N;
} & ReadonlyArray<T>;

export type OrbitColorSchemes<C, L, D> = {
    common?: Partial<C>;
    light: Partial<L>;
    dark: Partial<D>;
}

export type OrbitSpace = FixedSizeArray<13, string>;

export type OrbitFontSizes = {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "subheadline": string;
    "headline": string;
}

export type OrbitFontWeights = FixedSizeArray<9, number>;

export type OrbitLineHeights = FixedSizeArray<6, number>;

export type OrbitBorderWidths = FixedSizeArray<5, string>;

export type OrbitShadows = FixedSizeArray<4, string>;
export type OrbitShadowsColorSchemes = OrbitColorSchemes<OrbitShadows, OrbitShadows, OrbitShadows>;

export type OrbitElevations = {
    "skim": string;
    "lifted": string;
    "raised": string;
    "floating": string;
}

export type OrbitRadii = FixedSizeArray<4, string>;

export type OrbitZIndices = FixedSizeArray<5, number>;

export type OrbitColorPalette = FixedSizeArray<10, string>;

export type OrbitColors = {
    white: string;
    black: string;
    marine: OrbitColorPalette;
    sunray: OrbitColorPalette;
    moonstone: OrbitColorPalette;
    cloud: OrbitColorPalette;
    neutral: OrbitColorPalette;
    "neutral-dark": OrbitColorPalette;
    beetle: OrbitColorPalette;
    botanic: OrbitColorPalette;
    primary: OrbitColorPalette;
}

export type OrbitColorRoles = {
    /* Background */
    "background-1": string;
    "background-1-hover": string;
    "background-1-active": string;
    "background-2": string;
    "background-2-hover": string;
    "background-2-active": string;
    "background-3": string;
    "background-4": string;
    "background-4-hover": string;
    "background-4-active": string;
    "background-5": string;
    "background-5-hover": string;
    "background-5-active": string;
    "background-6": string;
    "background-6-hover": string;
    "background-6-active": string;
    "background-primary-1": string;
    "background-primary-1-hover": string;
    "background-primary-1-active": string;
    "background-primary-1-focus": string;
    "background-primary-2": string;
    "background-negative-1": string;
    "background-negative-1-hover": string;
    "background-negative-1-active": string;
    "background-negative-2": string;
    "background-warning-1": string;
    "background-warning-1-hover": string;
    "background-warning-1-active": string;
    "background-warning-2": string;
    "background-positive-1": string;
    "background-positive-1-hover": string;
    "background-positive-1-active": string;
    "background-positive-2": string;
    "background-info-1": string;
    "background-info-1-hover": string;
    "background-info-active": string;
    /* Border */
    "border-1": string;
    "border-1-hover": string;
    "border-1-active": string;
    "border-2": string;
    "border-3": string;
    "border-3-hover": string;
    "border-3-active": string;
    "border-4": string;
    "border-4-hover": string;
    "border-primary-1": string;
    "border-primary-1-hover": string;
    "border-primary-1-active": string;
    "border-primary-1-translucent": string;
    "border-negative-1": string;
    "border-negative-1-hover": string;
    "border-negative-1-active": string;
    "border-negative-1-translucent": string;
    "border-negative-2": string;
    "border-warning-1": string;
    "border-warning-1-hover": string;
    "border-warning-1-active": string;
    "border-positive-1": string;
    "border-positive-1-hover": string;
    "border-positive-1-active": string;
    /* Icon */
    "icon-1": string;
    "icon-2": string;
    "icon-primary-1": string;
    "icon-negative-1": string;
    "icon-negative-2": string;
    "icon-positive-1": string;
    "icon-positive-2": string;
    "icon-warning-1": string;
    "icon-warning-2": string;
    "icon-info-1": string;
    /* Text */
    "text-1": string;
    "text-1-hover": string;
    "text-1-active": string;
    "text-2": string;
    "text-2-hover": string;
    "text-2-active": string;
    "text-3": string;
    "text-3-hover": string;
    "text-3-active": string;
    "text-4": string;
    "text-primary-1": string;
    "text-primary-1-hover": string;
    "text-primary-1-active": string;
    "text-negative-1": string;
    "text-negative-1-hover": string;
    "text-negative-1-active": string;
    "text-negative-2": string;
    "text-info-1": string;
    "text-info-1-hover": string;
    "text-info-1-active": string;
    "text-positive-1": string;
    "text-positive-1-hover": string;
    "text-positive-1-active": string;
    "text-positive-2": string;
    "text-warning-1": string;
    "text-warning-1-hover": string;
    "text-warning-1-active": string;
    "text-warning-2": string;
    "text-input-selection": string;
    "text-input-placeholder": string;
}

export interface OrbitTheme {
    name: string;
    space: OrbitSpace;
    fontSizes: OrbitFontSizes;
    fontWeights: OrbitFontWeights;
    lineHeights: OrbitLineHeights;
    borderWidths: OrbitBorderWidths;
    shadows: OrbitShadows | OrbitShadowsColorSchemes;
    elevations: OrbitElevations;
    radii: OrbitRadii;
    zIndices: OrbitZIndices;
    colors: OrbitColors | OrbitColorSchemes<OrbitColors, OrbitColorRoles, OrbitColorRoles>;
}

export type ApricotColors = OrbitColors & {
    apricot: OrbitColorPalette
}

export interface ApricotTheme extends OrbitTheme {
    colors: ApricotColors | OrbitColorSchemes<ApricotColors, OrbitColorRoles, OrbitColorRoles>;
}

export const ApricotTheme: ApricotTheme = {
    name: "apricot",
    space: [".25rem", ".5rem", ".75rem", "1rem", "1.25rem", "1.5rem", "2rem", "2.5rem", "3rem", "3.5rem", "4rem", "4.5rem", "5rem"],
    fontSizes: {
        "1": ".625rem",
        "2": ".75rem",
        "3": ".875rem",
        "4": "1rem",
        "5": "1.125rem",
        "6": "1.375rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.5rem",
        "subheadline": "3.75rem",
        "headline": "5rem"
    },
    fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    lineHeights: [1, 1.2, 1.25, 1.3333333, 1.454595, 1.5],
    borderWidths: [".125rem", ".25rem", ".5rem", "1rem", "2rem"],
    shadows: {
        light: [`
            0 0.1px 0.3px rgba(0, 0, 0, 0.022),
            0 0.1px 0.7px rgba(0, 0, 0, 0.032),
            0 0.3px 1.3px rgba(0, 0, 0, 0.04),
            0 0.4px 2.2px rgba(0, 0, 0, 0.048),
            0 0.8px 4.2px rgba(0, 0, 0, 0.058),
            0 2px 10px rgba(0, 0, 0, 0.08)
            `, `
            0 0.2px 0.6px rgba(0, 0, 0, 0.02),
            0 0.5px 1.3px rgba(0, 0, 0, 0.028),
            0 0.9px 2.5px rgba(0, 0, 0, 0.035),
            0 1.6px 4.5px rgba(0, 0, 0, 0.042),
            0 2.9px 8.4px rgba(0, 0, 0, 0.05),
            0 7px 20px rgba(0, 0, 0, 0.07)
            `, `
            0 0.3px 1.1px rgba(0, 0, 0, 0.017),
            0 0.7px 2.7px rgba(0, 0, 0, 0.024),
            0 1.3px 5px rgba(0, 0, 0, 0.03),
            0 2.2px 8.9px rgba(0, 0, 0, 0.036),
            0 4.2px 16.7px rgba(0, 0, 0, 0.043),
            0 10px 40px rgba(0, 0, 0, 0.06)
            `, `
            0 1.1px 2.2px -5px rgba(0, 0, 0, 0.022),
            0 2.7px 5.3px -5px rgba(0, 0, 0, 0.032),
            0 5px 10px -5px rgba(0, 0, 0, 0.04),
            0 8.9px 17.9px -5px rgba(0, 0, 0, 0.048),
            0 16.7px 33.4px -5px rgba(0, 0, 0, 0.058),
            0 40px 80px -5px rgba(0, 0, 0, 0.08)
            `
        ],
        dark: [`
            0 0.3px 1.1px rgba(0, 0, 0, 0.056),
            0 0.7px 2.7px rgba(0, 0, 0, 0.081),
            0 1.3px 5px rgba(0, 0, 0, 0.1),
            0 2.2px 8.9px rgba(0, 0, 0, 0.119),
            0 4.2px 16.7px rgba(0, 0, 0, 0.144),
            0 10px 40px rgba(0, 0, 0, 0.2)
            `, `
            0 0.2px 0.6px rgba(0, 0, 0, 0.056),
            0 0.5px 1.3px rgba(0, 0, 0, 0.081),
            0 0.9px 2.5px rgba(0, 0, 0, 0.1),
            0 1.6px 4.5px rgba(0, 0, 0, 0.119),
            0 2.9px 8.4px rgba(0, 0, 0, 0.144),
            0 7px 20px rgba(0, 0, 0, 0.2)
            `, `
            0 0.3px 1.1px rgba(0, 0, 0, 0.056),
            0 0.7px 2.7px rgba(0, 0, 0, 0.081),
            0 1.3px 5px rgba(0, 0, 0, 0.1),
            0 2.2px 8.9px rgba(0, 0, 0, 0.119),
            0 4.2px 16.7px rgba(0, 0, 0, 0.144),
            0 10px 40px rgba(0, 0, 0, 0.2)
            `, `
            0 0.7px 2.2px rgba(0, 0, 0, 0.034),
            0 1.7px 5.3px rgba(0, 0, 0, 0.048),
            0 3.1px 10px rgba(0, 0, 0, 0.06),
            0 5.6px 17.9px rgba(0, 0, 0, 0.072),
            0 10.4px 33.4px rgba(0, 0, 0, 0.086),
            0 25px 80px rgba(0, 0, 0, 0.12)
            `
        ]
    },
    elevations: {
        "skim": "$shadows-1",
        "lifted": "$shadows-2",
        "raised": "$shadows-3",
        "floating": "$shadows-4",
    },
    radii: [".125rem", ".25rem", ".5rem", "1rem"],
    zIndices: [1, 2, 3, 4, 5],
    colors: {
        common: {
            white: "#FFF",
            black: "#000",
            marine: [
                "hsla(222, 100%, 96%, 1)",
                "hsla(222, 26%, 79%, 1)",
                "hsla(222, 16%, 65%, 1)",
                "hsla(220, 15%, 54%, 1)",
                "hsla(220, 18%, 45%, 1)",
                "hsla(222, 24%, 38%, 1)",
                "hsla(222, 30%, 32%, 1)",
                "hsla(222, 37%, 27%, 1)",
                "hsla(221, 45%, 22%, 1)",
                "hsla(222, 63%, 15%, 1)"
            ],
            sunray: [
                "hsla(38, 100%, 95%, 1)",
                "hsla(39, 97%, 85%, 1)",
                "hsla(39, 98%, 80%, 1)",
                "hsla(39, 97%, 75%, 1)",
                "hsla(39, 97%, 70%, 1)",
                "hsla(39, 97%, 65%, 1)",
                "hsla(38, 97%, 60%, 1)",
                "hsla(36, 96%, 55%, 1)",
                "hsla(35, 96%, 50%, 1)",
                "hsla(32, 96%, 45%, 1)"
            ],
            moonstone: [
                "hsla(180, 28%, 95%, 1)",
                "hsla(180, 30%, 88%, 1)",
                "hsla(178, 31%, 80%, 1)",
                "hsla(179, 31%, 71%, 1)",
                "hsla(179, 30%, 65%, 1)",
                "hsla(179, 30%, 59%, 1)",
                "hsla(179, 29%, 56%, 1)",
                "hsla(179, 27%, 52%, 1)",
                "hsla(179, 28%, 48%, 1)",
                "hsla(179, 34%, 42%, 1)"
            ],
            cloud: [
                "hsla(223, 11%, 95%, 1)",
                "hsla(223, 12%, 87%, 1)",
                "hsla(223, 13%, 78%, 1)",
                "hsla(223, 12%, 70%, 1)",
                "hsla(223, 13%, 63%, 1)",
                "hsla(223, 13%, 56%, 1)",
                "hsla(223, 12%, 53%, 1)",
                "hsla(223, 12%, 49%, 1)",
                "hsla(223, 13%, 45%, 1)",
                "hsla(223, 15%, 38%, 1)"
            ],
            neutral: [
                "hsla(180, 14%, 99%, 1)",
                "hsla(210, 11%, 96%, 1)",
                "hsla(225, 14%, 95%, 1)",
                "hsla(228, 13%, 92%, 1)",
                "hsla(220, 12%, 91%, 1)",
                "hsla(223, 13%, 89%, 1)",
                "hsla(218, 9%, 83%, 1)",
                "hsla(223, 6%, 77%, 1)",
                "hsla(223, 5%, 71%, 1)",
                "hsla(223, 4%, 64%, 1)"
            ],
            "neutral-dark": [
                "hsla(220, 6%, 56%, 1)",
                "hsla(220, 6%, 52%, 1)",
                "hsla(220, 6%, 48%, 1)",
                "hsla(220, 6%, 44%, 1)",
                "hsla(220, 6%, 40%, 1)",
                "hsla(220, 6%, 36%, 1)",
                "hsla(220, 6%, 32%, 1)",
                "hsla(220, 6%, 28%, 1)",
                "hsla(220, 6%, 24%, 1)",
                "hsla(220, 6%, 20%, 1)"
            ],
            beetle: [
                "hsla(349, 100%, 95%, 1)",
                "hsla(348, 97%, 86%, 1)",
                "hsla(348, 98%, 77%, 1)",
                "hsla(348, 98%, 67%, 1)",
                "hsla(348, 97%, 60%, 1)",
                "hsla(348, 98%, 53%, 1)",
                "hsla(348, 90%, 51%, 1)",
                "hsla(348, 83%, 50%, 1)",
                "hsla(348, 81%, 48%, 1)",
                "hsla(348, 80%, 46%, 1)"
            ],
            botanic: [
                "hsla(146, 64%, 94%, 1)",
                "hsla(146, 64%, 84%, 1)",
                "hsla(146, 65%, 73%, 1)",
                "hsla(146, 65%, 62%, 1)",
                "hsla(146, 64%, 54%, 1)",
                "hsla(146, 75%, 46%, 1)",
                "hsla(145, 77%, 45%, 1)",
                "hsla(143, 80%, 42%, 1)",
                "hsla(141, 83%, 40%, 1)",
                "hsla(138, 89%, 36%, 1)"
            ],
            apricot: [
                "hsla(174, 61%, 94%, 1)",
                "hsla(173, 63%, 85%, 1)",
                "hsla(173, 63%, 75%, 1)",
                "hsla(173, 64%, 65%, 1)",
                "hsla(173, 64%, 50%, 1)",
                "hsla(172, 65%, 48%, 1)",
                "hsla(173, 65%, 46%, 1)",
                "hsla(172, 63%, 45%, 1)",
                "hsla(172, 64%, 43%, 1)",
                "hsla(172, 62%, 41%, 1)"
            ],
            primary: [
                "$apricot-1",
                "$apricot-2",
                "$apricot-3",
                "$apricot-4",
                "$apricot-5",
                "$apricot-6",
                "$apricot-7",
                "$apricot-8",
                "$apricot-9",
                "$apricot-10"
            ]
        },
        light: {
            /* Background */
            "background-1": "$white",
            "background-1-hover": "$cloud-1",
            "background-1-active": "$cloud-2",
            "background-2": "$cloud-2",
            "background-2-hover": "$cloud-3",
            "background-2-active": "$cloud-6",
            "background-3": "$cloud-1",
            "background-4": "$neutral-2",
            "background-4-hover": "$neutral-4",
            "background-4-active": "$neutral-7",
            "background-5": "$marine-6",
            "background-5-hover": "$marine-8",
            "background-5-active": "$marine-10",
            "background-6": "$neutral-1",
            "background-6-hover": "$neutral-2",
            "background-6-active": "$neutral-3",
            "background-primary-1": "$primary-5",
            "background-primary-1-hover": "$primary-8",
            "background-primary-1-active": "$primary-10",
            "background-primary-1-focus": "$primary-1",
            "background-primary-2": "$primary-1",
            "background-negative-1": "$beetle-5",
            "background-negative-1-hover": "$beetle-8",
            "background-negative-1-active": "$beetle-10",
            "background-negative-2": "$beetle-1",
            "background-warning-1": "$sunray-1",
            "background-warning-1-hover": "$sunray-8",
            "background-warning-1-active": "$sunray-10",
            "background-warning-2": "$sunray-1",
            "background-positive-1": "$botanic-5",
            "background-positive-1-hover": "$botanic-8",
            "background-positive-1-active": "$botanic-10",
            "background-positive-2": "$botanic-1",
            "background-info-1": "$marine-1",
            "background-info-1-hover": "$marine-2",
            "background-info-active": "$marine-4",
            /* Border */
            "border-1": "$cloud-2",
            "border-1-hover": "$cloud-4",
            "border-1-active": "$cloud-6",
            "border-2": "$cloud-1",
            "border-3": "$neutral-6",
            "border-3-hover": "$neutral-8",
            "border-3-active": "$neutral-10",
            "border-4": "$marine-6",
            "border-4-hover": "$marine-8",
            "border-primary-1": "$primary-5",
            "border-primary-1-hover": "$primary-8",
            "border-primary-1-active": "$primary-10",
            "border-primary-1-translucent": "hsla(172, 65%, 48%, 50%)",
            "border-negative-1": "$beetle-6",
            "border-negative-1-hover": "$beetle-8",
            "border-negative-1-active": "$beetle-10",
            "border-negative-1-translucent": "hsla(348, 98%, 53%, 50%)",
            "border-negative-2": "$beetle-3",
            "border-warning-1": "$sunray-6",
            "border-warning-1-hover": "$sunray-8",
            "border-warning-1-active": "$sunray-10",
            "border-positive-1": "$botanic-6",
            "border-positive-1-hover": "$botanic-8",
            "border-positive-1-active": "$botanic-10",
            /* Icon */
            "icon-1": "$marine-10",
            "icon-2": "$marine-6",
            "icon-primary-1": "$primary-6",
            "icon-negative-1": "$beetle-6",
            "icon-negative-2": "$beetle-10",
            "icon-positive-1": "$botanic-6",
            "icon-positive-2": "$botanic-10",
            "icon-warning-1": "$sunray-6",
            "icon-warning-2": "$sunray-10",
            "icon-info-1": "$marine-6",
            /* Text */
            "text-1": "$marine-10",
            "text-1-hover": "$marine-10",
            "text-1-active": "$marine-10",
            "text-2": "$marine-6",
            "text-2-hover": "$marine-8",
            "text-2-active": "$marine-10",
            "text-3": "$cloud-6",
            "text-3-hover": "$cloud-8",
            "text-3-active": "$cloud-10",
            "text-4": "$marine-4",
            "text-primary-1": "$primary-6",
            "text-primary-1-hover": "$primary-8",
            "text-primary-1-active": "$primary-8",
            "text-negative-1": "$beetle-6",
            "text-negative-1-hover": "$beetle-8",
            "text-negative-1-active": "$beetle-10",
            "text-negative-2": "$beetle-10",
            "text-info-1": "$marine-6",
            "text-info-1-hover": "$marine-8",
            "text-info-1-active": "$marine-10",
            "text-positive-1": "$botanic-6",
            "text-positive-1-hover": "$botanic-8",
            "text-positive-1-active": "$botanic-10",
            "text-positive-2": "$botanic-10",
            "text-warning-1": "$sunray-6",
            "text-warning-1-hover": "$sunray-8",
            "text-warning-1-active": "$sunray-10",
            "text-warning-2": "$sunray-10",
            "text-input-selection": "$marine-6",
            "text-input-placeholder": "$marine-3"
        },
        dark: {
            /* Background */
            "background-1": "#2B2F3C",
            "background-1-hover": "$cloud-10",
            "background-1-active": "$cloud-9",
            "background-2": "$cloud-9",
            "background-2-hover": "$cloud-10",
            "background-2-active": "$cloud-7",
            "background-3": "$cloud-10",
            "background-4": "$neutral-dark-9",
            "background-4-hover": "$neutral-dark-4",
            "background-4-active": "$neutral-dark-2",
            "background-5": "$marine-7",
            "background-5-hover": "$marine-6",
            "background-5-active": "$marine-5",
            "background-6": "$neutral-dark-10",
            "background-6-hover": "$neutral-dark-9",
            "background-6-active": "$neutral-dark-8",
            "background-primary-1": "$primary-8",
            "background-primary-1-hover": "$primary-6",
            "background-primary-1-active": "$primary-5",
            "background-primary-1-focus": "$neutral-dark-9",
            "background-primary-2": "$neutral-dark-9",
            "background-negative-1": "$beetle-8",
            "background-negative-1-hover": "$beetle-6",
            "background-negative-1-active": "$beetle-5",
            "background-negative-2": "$beetle-10",
            "background-warning-1": "$sunray-8",
            "background-warning-1-hover": "$sunray-6",
            "background-warning-1-active": "$sunray-5",
            "background-warning-2": "$sunray-10",
            "background-positive-1": "$botanic-8",
            "background-positive-1-hover": "$botanic-6",
            "background-positive-1-active": "$botanic-5",
            "background-positive-2": "$botanic-10",
            "background-info-1": "$marine-7",
            "background-info-1-hover": "$marine-5",
            "background-info-active": "$marine-4",
            /* Border */
            "border-1": "$neutral-dark-7",
            "border-1-hover": "$neutral-dark-5",
            "border-1-active": "$neutral-dark-4",
            "border-2": "$neutral-dark-9",
            "border-3": "$neutral-dark-5",
            "border-4": "$marine-5",
            "border-4-hover": "$marine-7",
            "border-primary-1": "$primary-8",
            "border-primary-1-hover": "$primary-5",
            "border-primary-1-active": "$primary-4",
            "border-primary-1-translucent": "hsla(172, 63%, 45%, 50%)",
            "border-negative-1": "$beetle-8",
            "border-negative-1-hover": "$beetle-7",
            "border-negative-1-active": "$beetle-6",
            "border-negative-1-translucent": "hsla(348, 83%, 50%, 50%)",
            "border-negative-2": "$beetle-3",
            "border-warning-1": "$sunray-8",
            "border-warning-1-hover": "$sunray-7",
            "border-warning-1-active": "$sunray-6",
            "border-positive-1": "$botanic-8",
            "border-positive-1-hover": "$botanic-7",
            "border-positive-1-active": "$botanic-6",
            /* Icon */
            "icon-1": "$white",
            "icon-2": "$cloud-6",
            "icon-primary-1": "$primary-8",
            "icon-negative-1": "$beetle-8",
            "icon-negative-2": "$beetle-1",
            "icon-positive-1": "$botanic-8",
            "icon-positive-2": "$botanic-1",
            "icon-warning-1": "$sunray-8",
            "icon-warning-2": "$sunray-1",
            "icon-info-1": "$marine-2",
            /* Text */
            "text-1": "$white",
            "text-1-hover": "$white",
            "text-1-active": "$white",
            "text-2": "$cloud-4",
            "text-2-hover": "$cloud-2",
            "text-2-active": "$cloud-1",
            "text-3": "$cloud-8",
            "text-3-hover": "$cloud-7",
            "text-3-active": "$cloud-6",
            "text-4": "$marine-4",
            "text-primary-1": "$alias-primary-6",
            "text-primary-1-hover": "$alias-primary-5",
            "text-primary-1-active": "$alias-primary-5",
            "text-negative-1": "$beetle-8",
            "text-negative-1-hover": "$beetle-7",
            "text-negative-1-active": "$beetle-6",
            "text-negative-2": "$beetle-1",
            "text-warning-1": "$sunray-8",
            "text-warning-1-hover": "$sunray-7",
            "text-warning-1-active": "$sunray-6",
            "text-warning-2": "$sunray-1",
            "text-positive-1": "$botanic-8",
            "text-positive-1-hover": "$botanic-7",
            "text-positive-1-active": "$botanic-6",
            "text-positive-2": "$botanic-1",
            "text-info-1": "$marine-2",
            "text-info-1-hover": "$marine-4",
            "text-info-1-active": "$marine-5",
            "text-input-selection": "$white",
            "text-input-placeholder": "$marine-3"
        }
    }
};
