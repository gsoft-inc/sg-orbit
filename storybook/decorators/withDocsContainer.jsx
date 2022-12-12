import { DocsContainer } from "@storybook/addon-docs";
import { ShareGateTheme, LegacyTheme, ThemeProvider } from "@components/styling";

function ThemedDocsContainer({ context, children }) {
    const theme = context.globals.theme === "sharegate" ? ShareGateTheme : LegacyTheme;

    return (
        <ThemeProvider theme={theme} colorScheme="light">
            {children}
        </ThemeProvider>
    );
}

export function withDocsContainer(context, children) {
    return (
        <DocsContainer context={context}>
            <ThemedDocsContainer context={context}>
                {children}
            </ThemedDocsContainer>
        </DocsContainer>
    );
}