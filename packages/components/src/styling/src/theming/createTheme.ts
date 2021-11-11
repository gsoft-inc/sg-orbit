import { ColorAliases, ColorPalette, ColorPaletteSection, OrbitTheme } from "./orbitTheme";

export interface CreateThemeProps {
    name: string;
    colors: {
        white: string;
        black: string;
        gray: string;
        accent: ColorPalette;
        light: ColorAliases;
        dark: ColorAliases;
    };
}

const ShareGateColors: Partial<ColorPaletteSection> = {
    neutral: [
        "#f4f4f4",
        "#e5e5e5",
        "#c4c3c3",
        "#adacac",
        "#929292",
        "#777676",
        "#555454",
        "#434342",
        "#272626",
        "#111010"
    ],
    green: [
        "#dbfbea",
        "#cbeedb",
        "#a5cdb8",
        "#78ba9b",
        "#27a57a",
        "#268563",
        "#2b5e48",
        "#27493a",
        "#1a2a23",
        "#0c110e"
    ],
    orange: [
        "#fcf2e3",
        "#fee2bb",
        "#ffb470",
        "#ff9048",
        "#ff5c00",
        "#c7521a",
        "#874020",
        "#66351e",
        "#392015",
        "#170e09"
    ],
    purple: [
        "#eef3fd",
        "#dbe6fd",
        "#b6c2ef",
        "#95A9F5",
        "#7689FD",
        "#5D65F6",
        "#4B11FD",
        "#362AAE",
        "#1F2151",
        "#0D0F1F"
    ],
    success: [
        "#e3f8ec",
        "#ceedd7",
        "#93d39b",
        "#61c06d",
        "#17a93c",
        "#2d8739",
        "#2e5f30",
        "#284929",
        "#1b2a1a",
        "#0c110b"
    ],
    warning: [
        "#fcf3df",
        "#fbe3b5",
        "#f6ba42",
        "#d7a541",
        "#b48c3f",
        "#907239",
        "#65522f",
        "#4e4027",
        "#2c2619",
        "#12100b"
    ],
    alert: [
        "#fbf1f1",
        "#fadfdf ",
        "#fdb0af",
        "#f88f8d",
        "#eb6a64",
        "#d93c37",
        "#a91414",
        "#811b15",
        "#461812",
        "#1d0b09"
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
        gray,
        accent,
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
                gray,
                white,
                accent
            },
            light,
            dark
        }
    } as OrbitTheme;
}
