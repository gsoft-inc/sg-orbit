import { renderHookWithTheme } from "@test-utils";
import { useColorSchemeValue } from "@components/styling";

test("return the light color value when the color scheme is light", async () => {
    const { result } = renderHookWithTheme(() => useColorSchemeValue("light-color", "dark-color"), undefined, { colorScheme: "light" });

    expect(result.current).toBe("light-color");
});

test("return the dark color value when the color scheme is dark", async () => {
    const { result } = renderHookWithTheme(() => useColorSchemeValue("light-color", "dark-color"), undefined, { colorScheme: "dark" });

    expect(result.current).toBe("dark-color");
});
