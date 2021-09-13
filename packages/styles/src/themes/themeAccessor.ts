import { ColorSchemes, FontSizeValues, OrbitTheme } from "./types";
import { isNil } from "../assertions";

export class ThemeAccessor {
    private theme;

    constructor(theme: OrbitTheme) {
        this.theme = theme;
    }

    private getColorSchemeValue<C, L, D>(values: ColorSchemes<C, L, D>, key: string, colorScheme: keyof ColorSchemes<C, L, D>) {
        const section = values[colorScheme];

        if (!isNil(section)) {
            // @ts-ignore
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

    getBoxShadow(key: string, colorScheme = "common") {
        return this.getColorSchemeValue(this.theme.boxShadows, key, colorScheme as keyof typeof this.theme.boxShadows);
    }

    getColor(key: string, colorScheme = "common") {
        return this.getColorSchemeValue(this.theme.colors, key, colorScheme as keyof typeof this.theme.colors);
    }
}
