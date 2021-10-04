import { BoxShadowColorSchemes, ColorColorSchemes, ColorSchemeSection, FontSizeValues, OrbitTheme } from "./types";
import { isNil } from "../assertions";

export class ThemeAccessor {
    private theme;

    constructor(theme: OrbitTheme) {
        this.theme = theme;
    }

    private getColorSchemeValue<C, L, D>(values: ColorSchemeSection<C, L, D>, key: string, colorScheme: keyof ColorSchemeSection<C, L, D>) {
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
        return !isNil(this.theme) ? this.theme.name : "";
    }

    getSpace(index: number): string {
        return !isNil(this.theme) ? this.theme.space[index - 1] : "";
    }

    getFontSize(key: keyof FontSizeValues): string {
        return !isNil(this.theme) ? this.theme.fontSizes[key] : "";
    }

    getLineHeight(index: number): number {
        return !isNil(this.theme) ? this.theme.lineHeights[index - 1] : 0;
    }

    getBorderRadius(index: number): string {
        return !isNil(this.theme) ? this.theme.borderRadii[index - 1] : "";
    }

    getBoxShadow(key: string, colorScheme: keyof BoxShadowColorSchemes = "light"): string {
        return !isNil(this.theme) ? this.getColorSchemeValue(this.theme.boxShadows, key, colorScheme) : "";
    }

    getColor(key: string, colorScheme: keyof ColorColorSchemes = "light"): string {
        return !isNil(this.theme) ? this.getColorSchemeValue(this.theme.colors, key, colorScheme) : "";
    }
}
