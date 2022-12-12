import { ShareGateTheme, LegacyTheme, ThemeProvider } from "@components/styling";

import { isChromatic } from "../env";
import { getGlobals } from "../utils";

export function withThemeProvider(story, context) {
    const { viewMode } = context;
    const globals = getGlobals(context);

    return (
        <ThemeProvider
            theme={globals.theme === "sharegate" ? ShareGateTheme : LegacyTheme}
            colorScheme={globals.colorScheme}
            // min-height ensure popup components renders correctly in chromatic tests.
            height={viewMode === "story" || isChromatic ? "600px" : undefined}
        >
            {story()}
        </ThemeProvider>
    );
}
