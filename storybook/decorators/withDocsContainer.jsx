import { ApricotTheme, DesktopTheme, ThemeProvider } from "@react-components/styling";
import { DocsContainer } from "@storybook/addon-docs";

function ThemedDocsContainer({ context, children }) {
    const theme = context.globals.theme === "desktop" ? DesktopTheme : ApricotTheme;

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
