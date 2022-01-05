import { useThemeContext } from "./theming";

export function useColorSchemeValue(lightColor: string, darkColor: string) {
    const { colorScheme } = useThemeContext();

    return colorScheme === "dark" ? darkColor : lightColor;
}
