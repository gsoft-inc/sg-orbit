import { BoxShadowColorSchemes, ColorAliases, ColorPalette, ColorPaletteSection, OrbitTheme } from "./orbitTheme";

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
    boxShadows: BoxShadowColorSchemes;
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
        "#95a9f5",
        "#7689fd",
        "#5d65f6",
        "#4b11fd",
        "#362aae",
        "#1f2151",
        "#0d0f1f"
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
        "#fadfdf",
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

const ThemeBase: Omit<OrbitTheme, "name" | "colors" | "boxShadows"> = {
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
        10: "3.75rem",
        11: "5rem"
    },
    fontWeights: ["400", "500", "600"],
    lineHeights: [1, 1.2, 1.25, 1.3333333, 1.454595, 1.5],
    borderRadii: {
        1: ".125rem",
        2: ".25rem",
        3: ".5rem",
        4: "1rem",
        "pill": "999px",
        "circular": "100%"
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
    },
    boxShadows
}: CreateThemeProps): OrbitTheme {
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
        },
        boxShadows
    };
}
