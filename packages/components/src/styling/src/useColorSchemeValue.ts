import { useColorSchemeContext } from "./ColorSchemeContext";

export function useColorSchemeValue(lightColor: string, darkColor: string) {
    const { colorScheme } = useColorSchemeContext();

    return colorScheme === "dark" ? darkColor : lightColor;
}
