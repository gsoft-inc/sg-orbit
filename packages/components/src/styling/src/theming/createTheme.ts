import { ColorAliases, ColorPalette, ColorPaletteSection, OrbitTheme } from "./orbitTheme";

export interface CreateThemeProps {
    name: string;
    colors: {
        white: string;
        black: string;
        primary: ColorPalette;
        light: ColorAliases;
        dark: ColorAliases;
    };
}

const ShareGateColors: Partial<ColorPaletteSection> = {
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
    ]
};

const ThemeBase: Partial<OrbitTheme> = {
    sizing: [".75rem", "1rem", "1.25rem", "1.5rem", "2rem", "2.5rem", "3rem", "3.5rem", "4rem", "4.5rem", "5rem", "6rem", "8rem", "12rem", "16rem", "20rem", "24rem", "30rem"],
    space: [".25rem", ".5rem", ".75rem", "1rem", "1.25rem", "1.5rem", "2rem", "2.5rem", "3rem", "3.5rem", "4rem", "4.5rem", "5rem"],
    fontSizes: {
        1: ".625rem",
        2: ".75rem",
        3: ".875rem",
        4: "1rem",
        5: "1.125rem",
        6: "1.375rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.5rem",
        "subheadline": "3.75rem",
        "headline": "5rem"
    },
    fontWeights: ["400", "500", "600"],
    lineHeights: [1, 1.2, 1.25, 1.3333333, 1.454595, 1.5],
    borderRadii: [".125rem", ".25rem", ".5rem", "1rem"],
    boxShadows: {
        common: {
            "alias-skim": "$bs-1",
            "alias-lifted": "$bs-2",
            "alias-raised": "$bs-3",
            "alias-floating": "$bs-4"
        },
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
    }
};

export function createTheme({
    name,
    colors: {
        black,
        white,
        primary,
        light,
        dark
    }
}: CreateThemeProps) {
    return {
        ...ThemeBase,
        name,
        colors: {
            common: {
                ...ShareGateColors,
                black,
                white,
                primary
            },
            light,
            dark
        }
    } as OrbitTheme;
}
