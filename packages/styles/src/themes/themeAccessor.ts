import { BoxShadowColorSchemes, ColorColorSchemes, ColorSchemes, FontSizeValues, OrbitTheme } from "./types";
import { isNil } from "../assertions";

export class ThemeAccessor {
    private theme;

    constructor(theme: OrbitTheme) {
        this.theme = theme;
    }

    private getColorSchemeValue<C, L, D>(values: ColorSchemes<C, L, D>, key: string, colorScheme: keyof ColorSchemes<C, L, D>) {
        let section = values[colorScheme];

        if (!isNil(section)) {
            return section[key];
        }

        // Look in "common" if available.
        section = values.common;

        if (!isNil(section)) {
            return section[key];
        }
    }

    getName() {
        return this.theme.name;
    }

    getSpace(index: number) {
        return this.theme.space[index - 1];
    }

    getFontSize(key: keyof FontSizeValues) {
        return this.theme.fontSizes[key];
    }

    getLineHeight(index: number) {
        return this.theme.lineHeights[index - 1];
    }

    getBorderRadius(index: number) {
        return this.theme.borderRadii[index - 1];
    }

    getBoxShadow(key: string, colorScheme: keyof BoxShadowColorSchemes = "light") {
        return this.getColorSchemeValue(this.theme.boxShadows, key, colorScheme);
    }

    getColor(key: string, colorScheme: keyof ColorColorSchemes = "light") {
        return this.getColorSchemeValue(this.theme.colors, key, colorScheme);
    }
}
