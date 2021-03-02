import { ThemeProvider } from "@react-components/theme-provider";

export function withThemeProvider(Story, context) {
    const { viewMode, globals } = context;

    return (
        <ThemeProvider
            theme={globals.theme}
            colorScheme={globals.colorScheme}
            // min-height ensure popup components renders correctly in chromatic tests.
            style={viewMode === "story" ? { minHeight: "600px" } : undefined}
        >
            <Story />
        </ThemeProvider>
    );
}
