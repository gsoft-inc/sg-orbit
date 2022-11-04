import { ShareGateTheme, ThemeProvider } from "@components/styling";

import { isChromatic } from "../env";

export function withThemeProvider(story, context) {
    const { viewMode, globals } = context;

    return (
        <ThemeProvider
            theme={ShareGateTheme}
            colorScheme={globals.colorScheme}
            // min-height ensure popup components renders correctly in chromatic tests.
            height={viewMode === "story" || isChromatic ? "600px" : undefined}
        >
            {story()}
        </ThemeProvider>
    );
}
