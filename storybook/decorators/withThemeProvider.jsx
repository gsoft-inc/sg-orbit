import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { useColorScheme } from "../addons/colorScheme";
import { isChromatic } from "../env";

export function withThemeProvider(story, context) {
    const { viewMode } = context;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider
            theme={ShareGateTheme}
            colorScheme={colorScheme}
            // min-height ensure popup components renders correctly in chromatic tests.
            height={viewMode === "story" || isChromatic ? "600px" : undefined}
        >
            {story()}
        </ThemeProvider>
    );
}
