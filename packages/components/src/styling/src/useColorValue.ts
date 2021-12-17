import { useThemeContext } from "./theming";

export function useColorValue(lightColor: string, darkColor: string) {
    const { colorScheme } = useThemeContext();

    return colorScheme === "dark" ? darkColor : lightColor;
}
