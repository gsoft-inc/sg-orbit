import { ShareGateTheme, ThemeProvider } from "@components/styling";

import { isChromatic } from "../env";

export function withThemeProvider(Story, context) {
    const { viewMode, globals } = context;

    return (
        <ThemeProvider
            theme={globals.theme === "sharegate" ? ShareGateTheme : ShareGateTheme}
            colorScheme={globals.colorScheme ?? "system"}
            defaultColorScheme="light"
            // min-height ensure popup components renders correctly in chromatic tests.
            height={viewMode === "story" || isChromatic ? "600px" : undefined}
        >
            <Story />
        </ThemeProvider>
    );
}
