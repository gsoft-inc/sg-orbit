import { ThemeProvider } from "@react-components/theme-provider";
import { isChromatic } from "../env";

export function withThemeProvider(Story, context) {
    const { viewMode, globals } = context;

    return (
        <ThemeProvider
            theme={globals.theme}
            colorScheme={globals.colorScheme}
            // min-height ensure popup components renders correctly in chromatic tests.
            style={viewMode === "story" || isChromatic ? { height: "600px" } : undefined}
        >
            <Story />
        </ThemeProvider>
    );
}
